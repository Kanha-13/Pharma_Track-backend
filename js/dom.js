$(document).ready(function () {
    
    //continue v1.0
    $('#continue-v1').on("click",()=>{
        $('#v2-div').css("display", "none");
    })



    //logout function for refresh and window tab close
    const logoutAfterRefresh = () => {
        const url = '/logOut';
        $.ajax({
            type: "POST",
            url: url,
            contentType: 'application/json',
            success: function (res) {
                $('#logout-btn').css("display", "none")
                $('#login-btn').css("display", "block")
                $('#wlcm-wala-signUp-btn').show()
                document.getElementById("loginForm").reset();
                return "ok";
            },
            error: function (res) {
                alert(res)
            }
        });
    }
    //to make admin logout oneces page refreshed
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        logoutAfterRefresh();
        return "ok"
    })
    //to make admin logout oneces page closed
    window.onunload = function () {
        e.preventDefault();
        logoutAfterRefresh();
        return "ok"
    }
    //SHORT CUT KEY COMBINATIONS
    let keyPressed = {}
    $(window).on('keydown', (event) => {
        keyPressed[event.key] = true;
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['S'] || keyPressed['s'])) {
            event.preventDefault()
            $('#sell-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['E'] || keyPressed['e'])) {
            event.preventDefault()
            $('#nearExp-nav').click()

        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['F'] || keyPressed['f'])) {
            event.preventDefault()
            $('#search-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['H'] || keyPressed['h'])) {
            event.preventDefault()
            $('#home-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['A'] || keyPressed['a'])) {
            event.preventDefault()
            $('#add-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['B'] || keyPressed['b'])) {
            event.preventDefault()
            $('#findBill-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['D'] || keyPressed['d'])) {
            event.preventDefault()
            $('#manageInvent-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['P'] || keyPressed['p'])) {
            event.preventDefault()
            $('#purEntry-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['M'] || keyPressed['m'])) {
            event.preventDefault()
            $('#partyManage-nav').click()
        }
        if (keyPressed['Control'] && keyPressed['Shift'] && (keyPressed['R'] || keyPressed['r'])) {
            event.preventDefault()
            $('#sellPur-nav').click()
        }
    })
    $(window).on('keyup', (event) => {
        keyPressed[event.key] = false;
    })


    //for switching different window without reload

    $("#home-nav").click(function () {
        $(".nearExp-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".sell-container").hide();
        $('#first-billing-step-container').hide()
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".welcome-container").show();
    });
    $("#add-nav").click(function () {
        $(".welcome-container").hide();
        $(".nearExp-container").hide();
        $(".search-container").hide();
        $(".sell-container").hide();
        $('#first-billing-step-container').hide()
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".addProd-container").show();
    });
    $("#search-nav").click(function () {
        $(".welcome-container").hide();
        $(".nearExp-container").hide();
        $(".addProd-container").hide();
        $(".sell-container").hide();
        $('#first-billing-step-container').hide()
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".search-container").show();
    });
    $("#nearExp-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".sell-container").hide();
        $(".addProd-container").hide();
        $('#first-billing-step-container').hide()
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".nearExp-container").show();
    });
    $("#sell-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".sell-container").show();
    });
    $("#findBill-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".findBill-container").show()
    });
    $("#manageInvent-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".findBill-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".manageInvent-container").show()
    })
    $("#purEntry-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".purchase-container").show()
    })
    $("#partyManage-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").hide()
        $(".partyManage-container").show()
    })
    $("#sellPur-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".stockAlert-container").hide()
        $(".report-container").show()
    })
    $("#stockAlert-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").hide();
        $(".findBill-container").hide()
        $(".manageInvent-container").hide()
        $(".purchase-container").hide()
        $(".partyManage-container").hide()
        $(".report-container").hide()
        $(".stockAlert-container").show()
    })
    // for making active button
    $('.navbar').on('click', (btn) => {
        $(btn.target).addClass("active").siblings().removeClass('active');
        $('.navbar').removeClass("active")
    })

});

//to toggle between the category bottle/tablets so that we can have different type of packing
function changePacking() {
    const checked = $("input[name='category']:checked").val();
    if (checked === "bottle") {
        $('#qnty').attr({ "type": "text", "placeholder": "ml-mg-piece" })
    }
    else {
        $('#qnty').attr({ "type": "number", "placeholder": "Tablet / Strip" })
    }
}