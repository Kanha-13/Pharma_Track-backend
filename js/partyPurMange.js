var partyList = ''
var PartyCompanyList = ''
$(document).ready(() => {
    $('#partyManageSelcet').change(() => {
        if ($('#partyManageSelcet').val() === 'addParty') {
            $('.updateNewCompanyDiv').hide()
            $('.partyPurchaseHistoryDiv').hide()
            $('.companyWholeSellerList').hide()
            $('.creditRemaining').hide()
            $('.addNewPartyDiv').show()
        }
        if ($('#partyManageSelcet').val() === 'updateParty') {
            $('.addNewPartyDiv').hide()
            $('.partyPurchaseHistoryDiv').hide()
            $('.companyWholeSellerList').hide()
            $('.creditRemaining').hide()
            $('.updateNewCompanyDiv').show()
        }
        if ($('#partyManageSelcet').val() === 'partyHistory') {
            $('.updateNewCompanyDiv').hide()
            $('.addNewPartyDiv').hide()
            $('.companyWholeSellerList').hide()
            $('.creditRemaining').hide()
            $('.partyPurchaseHistoryDiv').show()
        }
        if ($('#partyManageSelcet').val() === 'companyList') {
            $('.updateNewCompanyDiv').hide()
            $('.addNewPartyDiv').hide()
            $('.partyPurchaseHistoryDiv').hide()
            $('.creditRemaining').hide()
            $('.companyWholeSellerList').show()
        }
        if ($('#partyManageSelcet').val() === 'creditBalance') {
            $('.updateNewCompanyDiv').hide()
            $('.addNewPartyDiv').hide()
            $('.partyPurchaseHistoryDiv').hide()
            $('.companyWholeSellerList').hide()
            $('.creditRemaining').show()
        }
    })
    // this function is for adding new party 
    $("#partyInfo").submit(function (e) {
        e.preventDefault();
        const url = "/partyManage";
        const Data = {
            partyName: $("#PartyName").val(),
            address: $("#Partyaddress").val(),
            mobileNo: $("#PartyMobileNo").val(),
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                //   console.log(response)
                alert(response)
                document.getElementById("partyInfo").reset();
                partyList = ''
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    })
    //this function is for updating company List
    $('#updateCompanyForm').submit(function (e) {
        e.preventDefault();
        const url = '/updateCompanyList'
        const Data = {
            wholeSellers: $('#selectPartyInupdateParty').val(),
            companyName: $('#PartyCompanyInupdatecompany').val()
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                //   console.log(response)
                alert(response)
                document.getElementById("updateCompanyForm").reset();
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    })
    // this function is for getting party list 
    $('#purEntry-nav,#partyManage-nav').click(async () => {
        const selectDiv = document.getElementById('selectParty')
        const selectInUpdateParty = document.getElementById('selectPartyInupdateParty')
        const selectPartyInHistory = document.getElementById('selectPartyInHistory')
        const selectPartyInCreditBalance = document.getElementById('selectPartyInCreditBalance')
        if (partyList === '') {
            const res = await fetch('/getPartyList')
            if (res.status == 401 || res.status == 500 || res.status === 400) {
                alert(res.statusText + " Admin not logged in")
                return
            }
            const Party = await res.json()
            const html = Party.map(match => `<option value="${match.partyName}">${match.partyName}</option>`)
            const Default = '<option value=""><==== Select Party ====></option>'
            partyList = Default + html;
        }
        selectDiv.innerHTML = partyList;
        selectInUpdateParty.innerHTML = partyList
        selectPartyInHistory.innerHTML = partyList
        selectPartyInCreditBalance.innerHTML = partyList
    })
    //for purchase entry
    $('#purchaseEntry-form').submit(function (e) {
        e.preventDefault();
        const url = "/purchaseEntry";
        const Data = {
            partyName: $("#selectParty").children("option:selected").val(),
            totalPurchaseOf: $("#purchaseAmt").val(),
            payMode: $("#payMode").val(),
            purDate: $('#dateInPurEntry').val(),
            billNo: $('#billNoInPurEntry').val()
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                //   console.log(response)
                alert(response)
                document.getElementById("purchaseEntry-form").reset();
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    })

    //this function is for getting party purchase History
    $('#partyHistoryForm').submit(function (e) {
        e.preventDefault()
        const url = '/partyPurchaseHistory'
        const Data = {
            partyName: $('#selectPartyInHistory').val(),
            from: $('#historyDatefrom').val(),
            to: $('#historyDateto').val(),
        }
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                console.log(response)
                const html = response.map(match => `<tr class="res-tr"><td>${new Date(match.date).toLocaleDateString()}</td><td>${match.partyName}</td><td><select style="width:150px;border:2px solid black;border-radius:5px;">${match.billNo.map(mat => `<option value="${mat}">${mat}</option>`).join('')}</select></td><td>${match.totalPurchaseOf}/-</td></tr>`).join('');
                const header = '<tr class="head-tr"><th>Date</th><th>Party Name</th><th>Bill No.</th><th>Total&emsp;Purchase&emsp;</th></tr>'
                document.getElementById('partyHistoryDetail').innerHTML = header + html
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    })
    //for getting company list
    $('#CompanySellerName').on('input', async (e) => {
        if (PartyCompanyList == '') {
            const PartyList = await fetch('/getCompanyList')
            if (PartyList.status == 401 || PartyList.status == 500 || PartyList.status === 400) {
                alert(PartyList.statusText + " Admin not logged in")
                return
            }
            PartyCompanyList = await PartyList.json()
        }
        const text = $('#CompanySellerName').val()
        let List = await PartyCompanyList.filter(lists => {
            // const regex = new RegExp(`^${searchText}`,'gi');
            const regex = new RegExp(`${text.trim()}`, 'gi');
            //conditoion for match
            return lists.companyName.match(regex)
            // && lists.wholeSellers.filter(seller => {
            //     seller.match(regex)
            // })
        });
        if (text.length === 0) {
            matches = [];
            document.getElementById('companyListDiv').innerHTML = '';
            return
        }

        const html = List.map(match => `<tr class="res-tr"><th>${match.companyName}</th><th><select style="background-color:white;border-radius:5px;border:2px solid black">${match.wholeSellers.map(mat => `<option>${mat}</option>`).join()}</select></th></tr>
        `).join('')
        document.getElementById('companyListDiv').innerHTML = html
    })
    //for refreshing company list
    $('#companyListRef').on('click', () => {
        partyCompanyList = ''
        document.getElementById('companyListDiv').innerHTML = ''
        document.getElementById('CompanySellerName').value = ''
    })

    // this is for getting credit balance of a party 
    $('#creditBalanceCheckForm').submit(function (e) {
        e.preventDefault()
        const URL = '/creditBalance'
        const Data = {
            partyName: $("#selectPartyInCreditBalance").val()
        }
        $.ajax({
            type: "POST",
            url: URL,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                console.log(response)
                document.getElementById('remainingBalance').value = response.balance
            },
            error: function (res) {
                if (res.status == 401 || res.status == 500 || res.status === 400) {
                    alert(res.statusText + " Admin not logged in")
                    return
                }
            }
        });
    })
})