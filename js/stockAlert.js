$(document).ready(() => {
    let matches = ''
    let alertProd = ''
    $("#lessStock-find").click(async () => {
        alertProd = document.getElementById('stockAlert')
        var date = new Date()
        var alertDate = new Date()
        date.setMonth(date.getMonth() + 2);
        alertDate.setMonth(alertDate.getMonth() + 1);
        var url = "/product/goingOutOfStock";
        if (matches == '') {
            const res = await fetch(url, {
                method: 'GET',
            })
            if (res.status == 401 || res.status == 500 || res.status === 400) {
                alert(res.statusText + " Admin not logged in")
                return
            }
            matches = await res.json()
            if (matches.length === 0) {
                alert("Stocks are sufficient 😃")
            }
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
                    const alertHtml = matches.map(match => `
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
                    alertProd.innerHTML = tableHead + alertHtml;
                }
            }
            outputHtml(matches);
        }
    })
    $('.clearStock-alert-btn').click(() => {
        matches = ''
        alertProd.innerHTML = '<div></div>';

    })
})