$(document).ready(()=>{
    $('#repoSelect').change(()=>{
        if($('#repoSelect').children("option:selected").val()==="sale"){
            $('#purchaseRepo').hide() 
            $('#profitRepo').hide() 
            $('#saleRepo').show() 
        }
        else if($('#repoSelect').children("option:selected").val()==="purchase"){
            $('#profitRepo').hide() 
            $('#saleRepo').hide() 
            $('#purchaseRepo').show() 
        }
        else if($('#repoSelect').children("option:selected").val()==="profit"){
            $('#purchaseRepo').hide() 
            $('#saleRepo').hide() 
            $('#profitRepo').show() 
        }
        else{
            $('#purchaseRepo').hide() 
            $('#saleRepo').hide() 
            $('#profitRepo').hide() 
        }
    })

    // for getting sale report 
    $('#getSaleRepo').click(()=>{
        const url = '/sellPurReport'
        const Data = {from:$('#saleDatefrom').val(),to:$('#saleDateto').val()}
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                var totalSale = 0
                const html = response.map(match=>`<tr class="res-tr"><td>${new Date(match.date).toLocaleDateString()}</td><td>${match.sellAmount}/-</td></tr>`).join('')
                const tableHead = '<tr class="head-tr"><th>Date</th><th>Total&emsp;Sale&emsp;</th></tr>'
                for(var i = 0;i<response.length;i++)
                totalSale=totalSale+response[i].sellAmount
                document.getElementById('saleReportdiv').value = totalSale.toFixed(4)
                document.getElementById('saleRepoDetail').innerHTML = tableHead+html
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    });
    // for getting purcahse report 
    $('#getPurRepo').click(()=>{
        const url = '/sellPurReport'
        const Data = {from:$('#purcDatefrom').val(),to:$('#purcDateto').val()}
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                var totalPur = 0
                const html = response.map(match=>`<tr class="res-tr"><td>${new Date(match.date).toLocaleDateString()}</td><td>${match.purchaseAmount}/-</td></tr>`).join('')
                const tableHead = '<tr class="head-tr"><th>Date</th><th>Total&emsp;Purchase&emsp;</th></tr>'
                for(var i = 0;i<response.length;i++)
                totalPur=totalPur+response[i].purchaseAmount
                document.getElementById('purReportdiv').value = totalPur.toFixed(4)
                document.getElementById('purRepoDetail').innerHTML = tableHead+html
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    });
    // for getting profit report
    $('#getProfitRepo').click(()=>{
        const url = '/sellPurReport'
        const Data = {from:$('#profDatefrom').val(),to:$('#profDateto').val()}
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                var totalPro = 0
                const html = response.map(match=>`<tr class="res-tr"><td>${new Date(match.date).toLocaleDateString()}</td><td>${match.profit}/-</td></tr>`).join('')
                const tableHead = '<tr class="head-tr"><th>Date</th><th>Total&emsp;Profit&emsp;</th></tr>'
                for(var i = 0;i<response.length;i++)
                totalPro=totalPro+response[i].profit
                document.getElementById('proReportdiv').value = totalPro.toFixed(4)
                document.getElementById('proRepoDetail').innerHTML = tableHead+html
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    });
})