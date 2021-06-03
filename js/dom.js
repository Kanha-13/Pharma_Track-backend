$(document).ready(function () {
    //to make admin logout oneces page refreshed
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        $('#logout-btn').click()
        return "ok"
    })
    //to make admin logout oneces page closed
    window.onunload = function () {
        e.preventDefault();
        $('#logout-btn').click()
        return "ok"
    }
    //SHORT CUT KEY COMBINATIONS
    let keyPressed={}
    $(window).on('keydown',(event)=>{
        keyPressed[event.key]=true;
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['S']||keyPressed['s']))
        {
            event.preventDefault()
            $('#sell-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['E']||keyPressed['e']))
        {
            event.preventDefault()
            $('#nearExp-nav').click()
           
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['F']||keyPressed['f']))
        {
            event.preventDefault()
            $('#search-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['H']||keyPressed['h']))
        {
            event.preventDefault()
            $('#home-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['A']||keyPressed['a']))
        {
            event.preventDefault()
            $('#add-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['B']||keyPressed['b']))
        {
            event.preventDefault()
            $('#findBill-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['D']||keyPressed['d']))
        {
            event.preventDefault()
            $('#manageInvent-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['P']||keyPressed['p']))
        {
            event.preventDefault()
            $('#purEntry-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['M']||keyPressed['m']))
        {
            event.preventDefault()
            $('#partyManage-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['R']||keyPressed['r']))
        {
            event.preventDefault()
            $('#sellPur-nav').click()
        }
    })
    $(window).on('keyup',(event)=>{
        keyPressed[event.key]=false;
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
        $(".findBill-container").show()
    });
    $("#manageInvent-nav").click(function (){
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
        $(".manageInvent-container").show()
    })
    $("#purEntry-nav").click(function (){
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
        $(".purchase-container").show()
    })
    $("#partyManage-nav").click(function (){
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
        $(".partyManage-container").show()
    })
    $("#sellPur-nav").click(function (){
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
        $(".report-container").show()
    })
    
    // for making active button
    $('.navbar').on('click', (btn) => {
        $(btn.target).addClass("active").siblings().removeClass('active');
        $('.navbar').removeClass("active")
    })
});
