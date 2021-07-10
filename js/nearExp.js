$(document).ready(() => {
    let matches = ''
    let expDiv = ''
    let alertProd = ''
    $("#nearExp-find").click(async () => {
        expDiv = document.getElementById('nearExp-product')
        alertProd = document.getElementById('alertProd')
        var date = new Date()
        var alertDate = new Date()
        date.setMonth(date.getMonth() + 2);
        alertDate.setMonth(alertDate.getMonth() + 1);
        var url = "/product/nearExp";
        var Data = {
            expDate: date,
            alertDate: alertDate,
        };
        if (matches == '') {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(Data),
                contentType: 'application/json',
                success: function (response) {
                    matches = [response[0], response[1]];
                    const outputHtml = matches => {
                        if (matches.length > 0) {
                            const tableHead = `
                            <table>
                                <tr class="head-tr">
                                    <th>Item&emsp;Name&emsp; </th>
                                    <th>Brand&emsp; </th>
                                    <th>Pk.Qnty&emsp; </th>
                                    <th>MRP&emsp; </th>
                                    <th>Exp.Date&emsp; </th>
                                    <th>Stock&emsp;tabs/btl&emsp;</th>
                                    <th>Location</th>
                                </tr>
                            </table>`
                            const alertHtml = matches[0].map(match => `
                            <div>
                                <table class="res-table">
                                    <tr class="res-tr alertProd">
                                    <td>${match.itemName}</td>
                                    <td>${match.company}</td>
                                    <td>${match.qnty}</td>
                                    <td>${match.mrp}/-</td>
                                    <td>${new Date(match.expDate).toLocaleDateString()}</td>
                                    <td>${match.stock}</td>
                                    <td>${match.location}</td>
                                    </tr>
                                    
                                </table>
                            </div>
                            `).join('');
                            const Html = matches[1].map(match => `
                            <div>
                            <table class="res-table">
                                <tr class="res-tr">
                                <td>${match.itemName}</td>
                                <td>${match.company}</td>
                                <td>${match.qnty}</td>
                                <td>${match.mrp}/-</td>
                                <td>${new Date(match.expDate).toLocaleDateString()}</td>
                                <td>${match.stock}</td>
                                <td>${match.location}</td>
                                </tr>
                                
                            </table>
                            </div>
                            `).join('');
                            alertProd.innerHTML = tableHead + alertHtml;
                            expDiv.innerHTML = Html;
                        }
                    }
                    outputHtml(matches);
                    return response;
                },
                error: function (res) {
                    if (res.status == 401 || res.status == 500 || res.status === 400) {
                        alert(res.statusText + " Admin not logged in")
                        return
                    }
                }
            });
        }
    })
    $('.clearExp-btn').click(() => {
        matches = ''
        expDiv.innerHTML = '<div></div>';
        alertProd.innerHTML = '<div></div>';

    })
})