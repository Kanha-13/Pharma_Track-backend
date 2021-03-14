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
  else{
    selectDiv.innerHTML=partyList;
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
    stock: $("#stock").val() * $("#qnty").val(),
    company: $("#company").val(),
    mnfDate: $("#mnfDate").val(),
    expDate: $("#expDate").val(),
    mrp: $("#price").val(),
    rate: $("#rate").val(),
    gst: $("#gst").val(),
    netRate: $("#netRate").val(),
    batch: $("#batch").val(),
    seller: $("#seller").val(),
    billNo: $("#billNo").val(),
    purDate: $("#purDate").val(),
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

//for getting net rate
$('#rate ,#gst').on('input', () => {
  var rate = parseFloat($('#rate').val())
  var gst = parseFloat($('#gst').val())
  $('#netRate').val(((rate * gst) / 100) + rate || rate || 0)
  return
})