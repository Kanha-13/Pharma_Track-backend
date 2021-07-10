$('#add-nav').click(async () => {
  const selectDiv = document.getElementById('seller')
  if (partyList === '') {
    const res = await fetch('/getPartyList')
    if (res.status == 401 || res.status == 500 || res.status === 400) {
      alert(res.statusText + " Admin not logged in")
      return
    }
    const Party = await res.json()
    const html = Party.map(match => `<option value="${match.partyName}">${match.partyName}</option>`)
    const Default = '<option value=""><==== Select Party ====></option>'
    selectDiv.innerHTML = Default + html;
    partyList = Default + html
  }
  else {
    selectDiv.innerHTML = partyList;
  }
})
$("#addProd-form").submit(function (e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  var url = "/product";
  var Data = {
    itemName: $("#itemName").val(),
    type: $("#type").val(),
    location: $("#location").val(),
    qnty: $("#qnty").val(),
    stock: '',
    company: $("#company").val(),
    mnfDate: $("#mnfDate").val(),
    expDate: $("#expDate").val(),
    mrp: $("#price").val(),
    category: $("input[name='category']:checked").val(),
    rate: $("#rate").val(),
    gst: $("#gst").val(),
    netRate: $("#netRate").val(),
    batch: $("#batch").val(),
    seller: $("#seller").val(),
    billNo: $("#billNo").val(),
    purDate: $("#purDate").val(),
    hsn_sac: $("#hsn-addProd").val(),
  }
  if (Data.category === "tablet") {
    Data.stock = $("#stock").val() * $("#qnty").val()
  }
  else {
    Data.stock = $("#stock").val()
  }
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(Data),// serializes the form's elements.
    contentType: 'application/json',
    success: function (response) {
      alert(response.message);
      document.getElementById("addProd-form").reset();
      return response;
    },
    error: function (res) {
      if (res.status == 401 || res.status == 500 || res.status === 400) {
        alert(res.statusText + " Admin not logged in")
        return
      }
    }
  });
  return
});


//schortcut to add product (matlab add product menu me item name me list show krna hai aur jo bhi product select krenge uski detail auto fill krwana hai but user ko change ka option dena hai )
// $()
const findProdToAdd = async (searchProd) => {
  document.getElementById("inventory-product-List").style.display = "block"
  const newprodName = searchProd.value
  const inventoryList = document.getElementById("inventory-product-List")
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
    const regex = new RegExp(`${newprodName.trim()}`, 'gi');
    //conditoion for match
    return product.itemName.match(regex) || product.company.match(regex);
  });
  if (newprodName.length === 0) {
    matches = [];
    inventoryList.style.display = "none"
  }
  if (matches.length === 0) {
    inventoryList.style.display = "none"
  }
  //show result in html
  const outputHtml = matches => {
    const table_header = `<table>
        <tr class="head-tr">
            <th>Item&emsp;Name&emsp; </th>
            <th>Company&emsp; </th>
            <th>Pack.&emsp; </th>
            <th>MRP&emsp; </th>
            <th>Stock&emsp;tabs/btl&emsp;</th>
            <th>Location</th>
        </tr>
    </table>`
    const html = matches.map((match, index) => `
          <table>
            <tr id="${match._id}" onClick="addThisProd(this)" class="res-tr">
              <td>${match.itemName}</td>
              <td>${match.company}</td>
              <td>${match.qnty}</td>
              <td>${match.mrp}/-</td>
              <td>${match.stock}</td>
              <td>${match.location}</td>
            </tr>
          </table>
        `).join('');
    inventoryList.innerHTML = table_header + html;
  }
  outputHtml(matches);

  console.log()
}
const addThisProd = (match) => {
  const productToAdd = products.filter(product => {
    return product._id.match(match.id)
  })
  document.getElementById("location").value = productToAdd[0].location
  document.getElementById("batch").value = productToAdd[0].batch
  document.getElementById("netRate").value = productToAdd[0].netRate
  document.getElementById("gst").value = productToAdd[0].gst
  document.getElementById("rate").value = productToAdd[0].rate
  // document.getElementById("stock")=productToAdd[0].
  // document.getElementById("purDate")=productToAdd[0].
  // document.getElementById("expDate")=productToAdd[0].
  // document.getElementById("mnfDate")=productToAdd[0].
  document.getElementById("hsn-addProd").value = productToAdd[0].hsn_sac
  document.getElementById("price").value = productToAdd[0].mrp
  document.getElementById("company").value = productToAdd[0].company
  document.getElementById("itemName").value = productToAdd[0].itemName
  if (productToAdd[0].category === "tablet") {
    document.getElementById("tabs").checked = true
    document.getElementById("qnty").value = productToAdd[0].qnty
  }
  else {
    $('#qnty').attr({ "type": "text", "placeholder": "ml-mg-piece" })
    document.getElementById("btls").checked = true
    document.getElementById("qnty").value = productToAdd[0].qnty
  }

  document.getElementById("inventory-product-List").style.display = "none"
}

//for getting net rate
$('#rate ,#gst').on('input', () => {
  var rate = parseFloat($('#rate').val())
  var gst = parseFloat($('#gst').val())
  $('#netRate').val(((rate * gst) / 100) + rate || rate || 0)
  return
})