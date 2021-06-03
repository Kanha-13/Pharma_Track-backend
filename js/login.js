
$(document).ready(() => {
    //this will automatically trim the spaces to prevent blank credenticals
    $('input[type="text"]').change(function(){
        this.value = $.trim(this.value);
    });
    // login page animation
    // Get the modal
    var modal = document.getElementById('id01');
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // login form -login button click action 
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        const Email = $('#email').val()
        const Pass = $('#pswd').val()
        const Data = { email: Email, password: Pass }
        const url = '/userLogin';
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                $('.close').click()
                $('#login-btn').hide()
                $('#logout-btn').show().css("display", "block")
                $('#wlcm-wala-signUp-btn').hide()
                return response;
            },
            error: function (res) {
                alert(res.responseJSON.Error_message)
                $("#email").css("border-color","red")
                $("#pswd").css("border-color","red")
            }
        });
    })
    $("#logout-btn").on('click', () => {
        const url = '/logOut';
        $.ajax({
            type: "POST",
            url: url,
            contentType: 'application/json',
            success: function (response) {
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
    })
    //welcome container wala login btn
    $('#login-btn').on('click',()=>{
        $('#signUpForm').css("display", "none")
        $('#loginForm').css("display", "block")
        document.getElementById('id01').style.display='block'
    })

    //signup button click action
    $(".form-signUp-btn,#wlcm-wala-signUp-btn").on('click', () => {
        document.getElementById('id01').style.display='block'
        $('#signUpForm').css("display", "block")
        $('.credentials').css("display", "block")
        $('#loginForm').css("display", "none")
        document.getElementById("loginForm").reset();
        $("#email").css("border-color","#625644")
        $("#pswd").css("border-color","#625644")

    })

    //to validate that user has entered correct email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    //signup form submission
    $("#signUpForm").submit((e) => {
        e.preventDefault();
        const userName = $('#signUpUserName').val();
        const userEmail = $('#signUpEmail').val();
        const password=$('#newPassword').val();
        const confirmPassword=$('#confirmNewPassword').val()
        if(validateEmail(userEmail)){
            if(password==confirmPassword){
                const Data = { userName:userName,userEmail: userEmail, password: password}
                const url='/userSignUp'
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(Data),// serializes the form's elements.
                    contentType: 'application/json',
                    success: function (res) {
                        document.getElementById("signUpForm").reset();
                        $('#signUpEmail').css("border-color","#625644")
                        $('.credentials').css("display","none")
                        $('#otpVerificationForm').css("display","block")
                        document.getElementById('userEmailId').value= res.userEmail
                        alert(res.message)
                        console.log(res.message)
                    },
                    error: function (res) {
                        $('#signUpEmail').css("border-color","red")
                        alert(res.responseJSON)
                        console.log(res.responseJSON)
                    }
                });
            }
            else{
                alert("Password does not match confirm password!!");    //The pop up alert for an unmatch password
                $('#newPassword').css("border-color","red")
                $('#confirmNewPassword').css("border-color","red")
                return false;
            }
        }
        else{
            alert("Invalid Email!!");    //The pop up alert for an unmatch password
            $('#signUpEmail').css("border-color","red")
            return false;
        }

    })
    //otp verification
    $("#otpSubmit-btn").on('click',()=>{
        const otp=$('#signUpOtp').val()
        const userEmail=document.getElementById('userEmailId').value
        const data={otp:otp,userEmail:userEmail}
        const url='/userOTPverification'
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {
                
                $('#otpVerificationForm').css("display","none")
                $('#logout-btn').show().css("display", "block")
                $('.close').click()
                $('#login-btn').hide()
                $('#wlcm-wala-signUp-btn').hide()
                alert(res.message)
                console.log(res.message)
            },
            error: function (res) {
                alert(res.responseJSON.message)
                console.log(res.responseJSON.message)
                $('#signUpOtp').css("border-color","red")
                $('#signUpOtp').val('');
            }
        });
    })
    
    //resend otp if otp does not reach or if also otp expired
    $("#resendSignUpOtp").on('click',()=>{
        console.log("a clicked")
    })

    //back to login page
    $("#backToLogin-btn").on('click', () => {
        $('#signUpForm').css("display", "none")
        $('#loginForm').css("display", "block")
    })
})