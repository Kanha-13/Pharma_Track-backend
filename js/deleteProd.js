const deleteSearch = document.getElementById('deleteProd-find')
const deletematchProd = document.getElementById('delete-product')
let deleteproducts = '';
var todelete = [];
//search and filter products
const deletesearchProducts = async searchText => {
    if (deleteproducts == '') {
        // const PechanKon = document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
        // console.log(PechanKon.meriPechan)
        const res = await fetch('/product/', {
            method: 'GET',
        })
        if (res.status == 401 || res.status == 500 || res.status === 400) {
            alert(res.statusText + " Admin not logged in")
            return
        }
        deleteproducts = await res.json()
    }
    //get matches to current text in input
    let matches = await deleteproducts.filter(product => {
        // const regex = new RegExp(`^${searchText}`,'gi');
        const regex = new RegExp(`${searchText.trim()}`, 'gi');

        //conditoion for match
        return product.itemName.match(regex) || product.company.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        deletematchProd.innerHTML = '';
    }


    //show result in html
    const outputHtml = matches => {
        if (matches.length > 0) {
            const tableHead = `<table id="deleteRes-table">
            <tr class="head-tr">
                <th>Item&emsp;Name&emsp; </th>
                <th>Brand&emsp; </th>
                <th>Pk.Qnty&emsp; </th>
                <th>MRP&emsp; </th>
                <th>Exp.Date&emsp; </th>
                <th>Stock&emsp;tabs/btl&emsp;</th>
                <th>Party&emsp;</th>
                <th>Location</th>
            </tr>
        </table>`
            const html = matches.map(match => `
            <div>
            <table id="${match._id}" onClick="toDelete(this)" ondblclick="undo(this)" class="res-table">
                <tr class="res-tr">
                <td>${match.itemName}</td>
                <td>${match.company}</td>
                <td>${match.qnty}</td>
                <td>${match.mrp}/-</td>
                <td>${new Date(match.expDate).toLocaleDateString()}</td>
                <td>${match.stock}</td>
                <td>
                    <select name="cars" id="cars" style="width:130px;">${match.seller.map(mat => `<option value="volvo">${mat}</option>`).join('')}</select>
                </td>
                <td>${match.location}</td>
                </tr>
            </table>
            </div>
            `).join('');
            deletematchProd.innerHTML = tableHead + html;
        }
    }
    outputHtml(matches);
    // console.log(matches);
}

//refresh the search
$('#deleteRef-btn').click(() => {
    document.getElementById('delete-product').innerHTML = ''
    document.getElementById('deleteProd-find').value = ''
    $('#goingTodelete').hide()
    document.getElementById("deleteList").innerHTML = ''
    deleteproducts = ''
    todelete = []
})

function toDelete(select) {
    $('#goingTodelete').show()
    for (var i = 0; i < todelete.length; i++) {
        if (todelete[i] === String(select.id)) return
    }
    todelete.push(select.id)
    document.getElementById('deleteList').appendChild(select)
    // document.getElementById('delete-product').removeChild(select)
}
function undo(select) {
    document.getElementById('delete-product').appendChild(select)
    todelete.pop(select.id)
    // document.getElementById('goingTodelete').removeChild(select)
}

//btn click to delete products
$("#deleteMatch-product").click(() => {
    if (todelete.length < 1) {
        alert("List empty!!")
    }
    else {
        const url = "/deleteProd"
        const data = todelete;
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {
                $('.navbar').hide()
                $('.header').hide()
                $('#deleteMatch-product').hide()
                $('#deleteProd-find').hide()
                $('#deleteRef-btn').hide()
                $('#delete-product').hide()
                $('#deleteRes-table').hide()
                $("#back-wallpaper").hide()
                window.print();
                alert(res)
                $('#deleteRef-btn').click()
                $('.navbar').show()
                $('.header').show()
                $('#deleteMatch-product').show()
                $('#deleteProd-find').show()
                $('#deleteRef-btn').show()
                $('#delete-product').show()
                $('#deleteRes-table').show()
                $("#back-wallpaper").show()
            },
            error: function () {
                alert('Error');
            }
        })
    }
})

deleteSearch.addEventListener('input', () => deletesearchProducts(deleteSearch.value));