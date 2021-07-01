const search = document.getElementById('search')
const matchProd = document.getElementById('match-product')
let products = '';
//search and filter products
const searchProducts = async searchText => {
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
        matchProd.innerHTML = '';
    }
    //show result in html
    const outputHtml = matches => {
        const table_header = `<table>
            <tr class="head-tr">
                <th>Item&emsp;Name&emsp; </th>
                <th>Company&emsp; </th>
                <th>Pk.Qnty&emsp; </th>
                <th>MRP&emsp; </th>
                <th>Stock&emsp;tabs/btl&emsp;</th>
                <th>Location</th>
            </tr>
        </table>`
        const html = matches.map(match => `
            <div>
            <table class="res-table">
                <tr class="res-tr">
                <td>${match.itemName}</td>
                <td>${match.company}</td>
                <td>${match.qnty}</td>
                <td>${match.mrp}/-</td>
                <td>${match.stock}</td>
                <td>${match.location}</td>
                </tr>
                
            </table>
            </div>
            `).join('');
        matchProd.innerHTML = table_header + html;
    }
    outputHtml(matches);
}
const refreshSearch = () => {
}
$('.searchRef-btn').click(() => {
    document.getElementById('sell-product').innerHTML = ''
    document.getElementById('match-product').innerHTML = ''
    document.getElementById('sellItem-find').value = ''
    document.getElementById('search').value = ''

    products = ''
})
search.addEventListener('input', () => searchProducts(search.value));