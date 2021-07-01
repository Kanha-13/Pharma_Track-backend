const sellProdSearch = document.getElementById('sellItem-find')
const sellMactProd = document.getElementById('sell-product')
//search and filter products
const sellSearchProduct = async searchText => {
    addedProd = []
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
                                <input id="${match._id}purRate" class="purRate-input" value="${(match.netRate / match.qnty).toFixed(4)}" style="display:none;"></input>
                                <td id="${match._id}itm-Name" class="first-bill-td">${match.itemName}</td>
                                <td id="${match._id}btch" class="first-bill-td">${match.batch}</td>
                                <td id="${match._id}exp" class="first-bill-td">${new Date(match.expDate).toLocaleDateString()}</td>
                                <td class="first-bill-td"><input min="0" max="${match.stock}" id="${match._id}qnt" required oninput="firstCal(this.value,${match.mrp / match.qnty},$('#${match._id}ttl'),$('#${match._id}disc'))" class="bill-input qntsOfItem" type="number"></td>
                                <td class="first-bill-td" id="${match._id}mrp">${match.mrp}/-</td>
                                <td class="first-bill-td" id="${match._id}rat">${(((match.mrp / match.qnty) * 100) / (100 + parseFloat(match.gst))).toFixed(3)}</td>
                                <td id="${match._id}gst" class="first-bill-td" >${match.gst}%</td>
                                <td class="first-bill-td" ><input id="${match._id}disc" oninput="calculateTtL(this.value,$('#${match._id}ttl'),$('#${match._id}qnt').val(),${match.mrp / match.qnty})" class="bill-input" type="text"></td>
                                <td class="first-bill-td" ><input id="${match._id}ttl" min="${match.netRate}" class="bill-input ttlAmt" type="text"></td>
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
var gttlWitOutRO = 0;
var reduceProfit = 0;
var reduceSell = 0;
const firstCal = (qnt, mrp, ttl, d) => {
    ttl[0].value = ((qnt * mrp) - (((qnt * mrp) / 100) * d[0].value) || qnt * mrp).toFixed(3);
    const ttls = $(".ttlAmt")
    const qntys = $('.qntsOfItem')
    const purRates = $('.purRate-input');
    var gttl = 0;
    var profitInthisSell = 0
    // console.log(document.getElementById('profitInthisBill').defaultValue)
    // console.log(document.getElementById('profitInthisBill').value)
    for (var i = 0; i < ttls.length; i++) {
        gttl = parseFloat(ttls[i].value) + parseFloat(gttl);
        profitInthisSell = profitInthisSell + ((parseFloat(ttls[i].value) - (parseFloat(purRates[i].value) * qntys[i].value)))
    }
    gttlWitOutRO = gttl;
    document.getElementById('grand-ttl').value = Math.round(gttl);
    document.getElementById('amt-paid').value = 0;
    document.getElementById('amt-due').value = Math.round(gttl);
    document.getElementById('profitInthisBill').value = profitInthisSell.toFixed(4);
    reduceProfit = document.getElementById('profitInthisBill').defaultValue - document.getElementById('profitInthisBill').value
    reduceSell = document.getElementById('grand-ttl').defaultValue - document.getElementById('grand-ttl').value
    return
}
//second calculation
const calculateTtL = (d, ttlId, qnt, mrp) => {
    ttlId[0].value = ((qnt * mrp) - (((qnt * mrp) / 100) * d)).toFixed(3)
    var ttls = $(".ttlAmt")
    const qntys = $('.qntsOfItem')
    const purRates = $('.purRate-input');
    var profitInthisSell = 0
    // console.log(document.getElementById('profitInthisBill').defaultValue)
    // console.log(document.getElementById('profitInthisBill').value)
    var gttl = 0;
    for (var i = 0; i < ttls.length; i++) {
        gttl = parseFloat(ttls[i].value) + parseFloat(gttl);
        profitInthisSell = profitInthisSell + ((parseFloat(ttls[i].value) - (parseFloat(purRates[i].value) * qntys[i].value)))
    }
    gttlWitOutRO = gttl;
    document.getElementById('grand-ttl').value = Math.round(gttl);
    document.getElementById('amt-due').value = Math.round(gttl);
    document.getElementById('profitInthisBill').value = profitInthisSell.toFixed(4);
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
    var returnQnty = [];

    if (oldBill) {
        for (var i = 0; i < addedProd.length; i++) {
            returnQnty.push([addedProd[i], $(`#${addedProd[i]}qnt`).attr('data-initial-value') - document.getElementById(addedProd[i] + 'qnt').value])
        }
    }
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
        date: document.getElementById('bil-date').defaultValue,
        roundoff: (document.getElementById('grand-ttl').value - gttlWitOutRO).toFixed(3),
        profit: document.getElementById('profitInthisBill').value,
        changeInProfit: reduceProfit,
        changeInSell: reduceSell,
    }

    if (addedProd.length) {
        for (var i = 0; i < addedProd.length; i++) {
            Data[i + 1] = { _id: addedProd[i], Soldqnt: document.getElementById(`${addedProd[i]}qnt`).value, disc: document.getElementById(`${addedProd[i]}disc`).value, total: document.getElementById(`${addedProd[i]}ttl`).value }
        }
        var url = '';
        if (oldBill) {
            url = '/patient/OldBill';
        }
        else { url = "/product/reduceStock"; }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify([Data, returnQnty]),// serializes the form's elements.
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
                if (document.getElementById('bil-date').value == 0) {
                    const todaysDate = new Date()
                    const date = todaysDate.getDate()
                    const month = todaysDate.getMonth()
                    const year = todaysDate.getFullYear()
                    document.getElementById('bil-date').value = (date + "/" + (month + 1) + "/" + year)
                }
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
                });
                //function for converting digit to words
                function numberToWords(number) {
                    var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
                    var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
                    var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
                    var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];

                    number = number.toString();
                    number = number.replace(/[\, ]/g, '');
                    if (number != parseFloat(number)) return 'not a number';
                    var x = number.indexOf('.'); if (x == -1) x = number.length;
                    if (x > 15) return 'too big'; var n = number.split('');
                    var str = ''; var sk = 0;
                    for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += digit[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } }
                    if (x != number.length) {
                        var y = number.length;
                        str += 'point ';
                        for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' ';
                    }
                    str = str.replace(/\number+/g, ' '); return str.trim() + ".";

                }
                document.getElementById('in-words').innerhtml = numberToWords(parseInt(document.getElementById('g-ttl').value))
                document.getElementById('bil-Ttl').value = Math.round(totalWithoutDisc);
                document.getElementById('DiscRs').value = Math.round(totalWithoutDisc) - document.getElementById('g-ttl').value
                document.getElementById('taxRs').value = (totalWithoutDisc - RateTotal).toFixed(3);
                if (!oldBill)
                    document.getElementById('ROff').value = (document.getElementById('g-ttl').value - gttlWitOutRO).toFixed(3)
                addedProd = [];
                $('#back-wallpaper').hide()
                window.print();
                document.getElementById("bill-print-form").reset()
                $("#first-billing-step-container").hide()
                document.getElementById('toCart').innerHTML = ''
                $('#invoice-print').hide()
                $('#back-wallpaper').show()
                $('#head-container').show()
                if (oldBill)
                    $(".findBill-container").show()
                else {
                    $(".findBill-container").hide()
                    $('.sell-container').show()
                }
                oldBill = false;
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