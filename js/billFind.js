var oldBill = false;
$(document).ready(()=>{
    var mobileNo = '';
    $('#oldBillFind-form').submit(function (e){
        e.preventDefault();
        $('#after-findclick').show()
        const Bills = document.getElementById('after-findclick')
        if(mobileNo===$('#PMobileNo').val())
        return
        mobileNo = $('#PMobileNo').val()
        const url = "/patient/billHistory";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({mobileNo:mobileNo}),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                if(response.length<1)
                alert("No Record Found")
                const html = response.map(bill=>`
                <table class="res-table">
                <tr id="${bill._id}" onClick="ShowBill(this)" class="res-tr">
                <td>${bill.billDetail.invoiceNo}</td>
                <td>${bill.patientName}</td>
                <td>${bill.mobileNo}</td>
                <td>${bill.address}</td>
                <td>${bill.age}</td>
                <td>${new Date(bill.billDetail.date).toLocaleDateString()}</td>
                <td>${bill.billDetail.grandTtl}</td>
                <td>${bill.billDetail.paid}</td>
                <td>${bill.billDetail.amtDue}</td>
                </tr>
                </table>
                `).join('');
                Bills.innerHTML=html;
            },
            error: function () {
                alert('Error');
            }
        });
    })
})


const ShowBill=(select)=>{
    const url = "/patient/renderBill"
    const billId = select.id
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({billId:billId}),// serializes the form's elements.
        contentType: 'application/json',
        success: function (response) {
            console.log(response)
            // $('.findBill-container').hide()
            $('#first-billing-step-container').show()
            document.getElementById('invoNo').value=response[0].billDetail.invoiceNo;
            document.getElementById('PName').value=response[0].patientName
            document.getElementById('mobNo').value=response[0].mobileNo
            document.getElementById('Page').value=response[0].age
            document.getElementById('ads').value=response[0].address
            document.getElementById('dr').value=response[0].billDetail.prescribedBy
            document.getElementById('grand-ttl').value=response[0].billDetail.grandTtl
            document.getElementById('amt-paid').value=response[0].billDetail.paid
            document.getElementById('amt-due').value=response[0].billDetail.amtDue
            document.getElementById('ROff').value=response[0].billDetail.roundoff
            const BillDate =new Date(response[0].billDetail.date);
            document.getElementById('bil-date').value = BillDate.getDate()+"/"+(BillDate.getMonth()+1)+"/"+BillDate.getFullYear()
            PatientOldBillDate=response[0].billDetail.amtDue
            const cartProd = document.getElementById('toCart')
            const outputHtml = response => {
                // console.log(response)
                addedProd=[]
                var count = 0;
                const html = response[0].purchasedMedDetail.map(match => `
                        <table class="res-table">
                            <tr class="res-tr first-bill-tr">
                            <td style="display: none;">${(addedProd.push(match._id))}</td>
                            <td id="${match._id}itm-Name" class="first-bill-td">${match.itemName}</td>
                            <td id="${match._id}btch" class="first-bill-td">${match.batch}</td>
                            <td id="${match._id}exp" class="first-bill-td">${new Date(match.expDate).toLocaleDateString()}</td>
                            <td class="first-bill-td"><input value="${response[0].billDetail.medicines[count].Soldqnt}" min="0" max="${match.stock}" id="${match._id}qnt" required class="bill-input" type="number"></td>
                            <td class="first-bill-td" id="${match._id}mrp">${match.mrp}/-</td>
                            <td class="first-bill-td" id="${match._id}rat">${(((match.mrp / match.qnty) * 100) / (100 + parseFloat(match.gst))).toFixed(3)}</td>
                            <td id="${match._id}gst" class="first-bill-td" >${match.gst}%</td>
                            <td class="first-bill-td" ><input value="${response[0].billDetail.medicines[count].disc}" id="${match._id}disc" class="bill-input" type="text"></td>
                            <td class="first-bill-td" ><input value="${response[0].billDetail.medicines[count++].total}" id="${match._id}ttl" class="bill-input ttlAmt" type="text"></td>
                            </tr>
                        </table>
                        `).join('');
                cartProd.innerHTML = html;
                oldBill=true;
            }
            outputHtml(response);
            return response;
        },
        error: function () {
            alert('Error');
        }
    });
}