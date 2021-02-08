const sellProdSearch = document.getElementById('sellItem-find')
const sellMactProd = document.getElementById('sell-product')
//search and filter products
const sellSearchProduct = async searchText => {
    if (products == '') {
        const res = await fetch('/product/', {
            method: 'GET',
        })
        if (res.status == 401 || res.status == 500 || res.status === 400) {
            alert(res.statusText + " Admin not logged in")
            return
        }
        products = await res.json()
    }
    //get matches to current text in input
    let matches = await products.filter(product => {
        // const regex = new RegExp(`^${searchText}`,'gi');
        const regex = new RegExp(`${searchText.trim()}`, 'gi');

        //conditoion for match
        return product.itemName.match(regex) || product.company.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        sellMactProd.innerHTML = '';
    }


    //show result in html
    const outputHtml = matches => {
        if (matches.length > 0) {
            const html = matches.map(match => `
            <div class="sell-tr">
            <table class="res-table" id="${match._id}" onClick="fun(this)">
                <tr class="res-tr">
                <td class="sell-td">${match.itemName}</td>
                <td class="sell-td">${match.qnty}</td>
                <td class="sell-td">${match.mrp}/-</td>
                <td class="sell-td">${match.gst}%</td>
                <td class="sell-td">${match.stock}</td>
                <td class="sell-td">${match.location}</td>
                </tr>
                
            </table>
            </div>
            `).join('');
            sellMactProd.innerHTML = html;
        }
    }
    outputHtml(matches);
    return
}
var addedProd = [];
const fun = (ele) => {

    for (var i = 0; i < addedProd.length; i++) {
        if (addedProd[i] === String(ele.id)) return
    }

    const selectedTable = document.getElementById('selectedSell-product')
    const selectedRow = document.getElementById(ele.id)
    const parent = selectedRow.parentNode
    const clone = parent.cloneNode(true)
    selectedRow.innerHTML = ele.outerHTML
    selectedTable.appendChild(clone)
    addedProd.push(ele.id)
    return
}


$('#clr-btn').click(() => {
    document.getElementById('selectedSell-product').innerHTML = '';
    addedProd = [];
    return
})
$('#checkOut-btn').click(() => {
    // console.log("hello")
    document.getElementById("bill-print-form").reset()
    var data = [];
    const sell = document.getElementById('selectedSell-product').getElementsByTagName('table')
    for (var i = 0; i < sell.length; i++)
        data[i] = sell[i].id;
    const url = "/product/toCart";
    if (data.length > 0) {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify({ ids: data }),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                $('.sell-container').hide();
                $('#first-billing-step-container').show();
                const cartProd = document.getElementById('toCart')
                const outputHtml = response => {
                    // console.log(response)

                    document.getElementById('invoNo').value = response.invoCount;
                    const html = response.Data.map(match => `
                            <table class="res-table">
                                <tr class="res-tr first-bill-tr">
                                <td id="${match._id}itm-Name" class="first-bill-td">${match.itemName}</td>
                                <td id="${match._id}btch" class="first-bill-td">${match.batch}</td>
                                <td id="${match._id}exp" class="first-bill-td">${new Date(match.expDate).toLocaleDateString()}</td>
                                <td class="first-bill-td"><input min="0" max="${match.stock}" id="${match._id}qnt" required oninput="firstCal(this.value,${match.mrp / match.qnty},$('#${match._id}ttl'),$('#${match._id}disc'))" class="bill-input" type="number"></td>
                                <td class="first-bill-td" id="${match._id}mrp">${match.mrp}/-</td>
                                <td class="first-bill-td" id="${match._id}rat">${(((match.mrp / match.qnty) * 100) / (100 + parseFloat(match.gst))).toFixed(3)}</td>
                                <td id="${match._id}gst" class="first-bill-td" >${match.gst}%</td>
                                <td class="first-bill-td" ><input id="${match._id}disc" oninput="calculateTtL(this.value,$('#${match._id}ttl'),$('#${match._id}qnt').val(),${match.mrp / match.qnty})" class="bill-input" type="text"></td>
                                <td class="first-bill-td" ><input id="${match._id}ttl" class="bill-input ttlAmt" type="text"></td>
                                </tr>
                                
                            </table>
                            `).join('');

                    cartProd.innerHTML = html;

                }
                outputHtml(response);
                return response;
            },
            error: function () {
                alert('Error');
            }
        });
    }
    else { alert('No item Selected') } return
})

//first step calculation
const firstCal = (qnt, mrp, ttl, d) => {
    ttl[0].value = (qnt * mrp) - (((qnt * mrp) / 100) * d[0].value) || qnt * mrp;
    var ttls = $(".ttlAmt")
    var gttl = 0;
    for (var i = 0; i < ttls.length; i++) {
        gttl = parseFloat(ttls[i].value) + parseFloat(gttl);
    }
    document.getElementById('grand-ttl').value = Math.round(gttl);
    document.getElementById('amt-paid').value = 0;
    document.getElementById('amt-due').value = Math.round(gttl);
    return
}
var gttlWitOutRO = 0;
//second calculation
const calculateTtL = (d, ttlId, qnt, mrp) => {
    ttlId[0].value = (qnt * mrp) - (((qnt * mrp) / 100) * d)
    var ttls = $(".ttlAmt")
    var gttl = 0;
    for (var i = 0; i < ttls.length; i++)
        gttl = parseFloat(ttls[i].value) + parseFloat(gttl);
    gttlWitOutRO = gttl;
    document.getElementById('grand-ttl').value = Math.round(gttl);
    document.getElementById('amt-due').value = Math.round(gttl);
    return
}
//calculation of amount due
$('#amt-paid').on('input', () => {
    document.getElementById('amt-due').value = $('#grand-ttl').val() - $('#amt-paid').val()
})
$("#grand-ttl").on('input', () => {
    document.getElementById('amt-due').value = $('#grand-ttl').val() - $('#amt-paid').val()

})
//form submit to print bill
$('#bill-print-form').submit(function (e) {
    e.preventDefault();
    // user details is store on the first index of data as object
    const Data = [];
    Data[0] = {
        patientName: $('#PName').val(),
        mobileNo: $('#mobNo').val(),
        address: $('#ads').val(),
        age: $('#Page').val(),
        prescribedBy: $('#dr').val(),
        invoiceNo: $('#invoNo').val(),
        gttl: $('#grand-ttl').val(),
        paid: $('#amt-paid').val(),
        amtDue: $('#amt-due').val(),
    }
    if (addedProd.length) {
        for (var i = 0; i < addedProd.length; i++) {
            Data[i + 1] = { pId: addedProd[i], Soldqnt: document.getElementById(`${addedProd[i]}qnt`).value, disc: document.getElementById(`${addedProd[i]}disc`).value }
        }
        // console.log(Data)
        var url = "/product/reduceStock";
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function async(response) {
                document.getElementById('selectedSell-product').innerHTML = '';
                $('#head-container').hide()
                alert(response)
                $('#invoice-print').show()
                var billContainer = document.getElementById('res-items-to-print')
                document.getElementById('invo').value = Data[0].invoiceNo
                document.getElementById('pName').value = Data[0].patientName
                document.getElementById('mob').value = Data[0].mobileNo
                document.getElementById('age').value = Data[0].age
                document.getElementById('adrs').value = Data[0].address
                document.getElementById('drName').value = Data[0].prescribedBy
                document.getElementById('g-ttl').value = Data[0].gttl
                document.getElementById('at-paid').value = Data[0].paid
                document.getElementById('at-due').value = Data[0].amtDue
                const todaysDate = new Date()
                document.getElementById('bil-date').value = (todaysDate.getDay() + '/' + (todaysDate.getMonth() + 1) + '/' + todaysDate.getFullYear())
                // console.log(document.getElementById('60153701ba1dcf376e0a70cbitm-Name'))
                var counter = 0;
                const html = addedProd.map(match => `
                    <div class="discription-header">
                                <input class="sinput res-input" value="${counter = parseInt(counter) + 1}" type="text">
                                <input class="iinput res-input" value="${$('#' + match + 'itm-Name')[0].outerText}"  type="text">
                                <input id="${match}Qnt" class="qinput res-input" value="${document.getElementById(match + 'qnt').value}" type="text">
                                <input class="einput res-input" value="${$('#' + match + 'exp')[0].outerText}" type="text">
                                <input class="binput res-input" value="${$('#' + match + 'btch')[0].outerText}"  type="text">
                                <input class="hinput res-input" value="${match}" type="text">
                                <input class="minput res-input" value="${$('#' + match + 'mrp')[0].outerText}" type="text">
                                <input id="${match}item-rate" class="rinput res-input" value="${$('#' + match + 'rat')[0].outerText}" type="text">
                                <input id="${match}item-gst" class="cinput res-input" value="${parseFloat($('#' + match + 'gst')[0].outerText) / 2}" type="text">
                                <input class="sinput res-input" value="${parseFloat($('#' + match + 'gst')[0].outerText) / 2}" type="text">
                                <input class="dinput res-input" value="${document.getElementById(match + 'disc').value}" type="text">
                                <input id="${match}item-total" class="tinput res-input" value="${document.getElementById(match + 'ttl').value}" type="text">
                                </div>
                                `).join('');
                billContainer.innerHTML = html;
                var totalWithoutDisc = 0;
                var RateTotal = 0;
                addedProd.forEach(element => {
                    const rate = document.getElementById(element + 'item-rate').value
                    const gst = document.getElementById(element + 'item-gst').value * 2
                    const qnty = document.getElementById(element + 'Qnt').value
                    totalWithoutDisc = parseFloat(totalWithoutDisc) + (parseFloat(rate) + parseFloat(gst * rate / 100)) * qnty
                    RateTotal = (parseFloat(rate) * parseFloat(qnty)) + RateTotal;
                    console.log(RateTotal)
                    console.log(totalWithoutDisc)
                });
                document.getElementById('bil-Ttl').value = Math.round(totalWithoutDisc);
                document.getElementById('DiscRs').value = Math.round(totalWithoutDisc) - document.getElementById('g-ttl').value
                document.getElementById('taxRs').value = (totalWithoutDisc - RateTotal).toFixed(3);
                document.getElementById('ROff').value = (document.getElementById('g-ttl').value - gttlWitOutRO).toFixed(3)
                addedProd = [];
                window.print();
                document.getElementById("bill-print-form").reset()
                $("#first-billing-step-container").hide()
                document.getElementById('toCart').innerHTML = ''
                $('#invoice-print').hide()
                $('#head-container').show()
                $('.sell-container').show()
            },
            error: function () {
                alert('Error: Sotock is not reduced');
                return
            }
        })
    }
    else {
        alert("Empty List")
    }
})

sellProdSearch.addEventListener('input', () => sellSearchProduct(sellProdSearch.value));