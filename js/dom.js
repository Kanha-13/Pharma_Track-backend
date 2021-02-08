$(document).ready(function () {

    //SHORT CUT KEY COMBINATIONS
    let keyPressed={}
    $(window).on('keydown',(event)=>{
        keyPressed[event.key]=true;
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['S']||keyPressed['s']))
        {
            $('#sell-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['E']||keyPressed['e']))
        {
            $('#nearExp-nav').click()
           
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['F']||keyPressed['f']))
        {
            $('#search-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['H']||keyPressed['h']))
        {
            $('#home-nav').click()
        }
        if(keyPressed['Control']&&keyPressed['Shift']&&(keyPressed['A']||keyPressed['a']))
        {
            $('#add-nav').click()
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
        $(".welcome-container").show();
    });
    $("#add-nav").click(function () {
        $(".welcome-container").hide();
        $(".nearExp-container").hide();
        $(".search-container").hide();
        $(".sell-container").hide();
        $('#first-billing-step-container').hide()
        $(".addProd-container").show();
    });
    $("#search-nav").click(function () {
        $(".welcome-container").hide();
        $(".nearExp-container").hide();
        $(".addProd-container").hide();
        $(".sell-container").hide();
        $('#first-billing-step-container').hide()
        $(".search-container").show();
    });
    $("#nearExp-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".sell-container").hide();
        $(".addProd-container").hide();
        $('#first-billing-step-container').hide()
        $(".nearExp-container").show();
    });
    $("#sell-nav").click(function () {
        $(".welcome-container").hide();
        $(".search-container").hide();
        $(".addProd-container").hide();
        $(".nearExp-container").hide();
        $('#first-billing-step-container').hide()
        $(".sell-container").show();
    });
    // for making active button
    $('.navbar').on('click', (btn) => {
        $(btn.target).addClass("active").siblings().removeClass('active');
        $('.navbar').removeClass("active")
    })

    // login page animation
    // Get the modal
    var modal = document.getElementById('id01');
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});
