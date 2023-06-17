$(document).ready(() => {
    //this will automatically trim the spaces to prevent blank credenticals
    $('input[type="text"]').change(function () {
        this.value = $.trim(this.value);
    });
    // login page animation
    // Get the modal
    var modal = document.getElementById('id01');
    var version2 = document.getElementById('continue-v1');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $('#verifyResendForm').css("display", "none");
            $('#otpVerificationForm').css("display", "none");
        }
    }

    // login form -login button click action 
    $("#loginForm").submit(function (e) {
        document.getElementById("form-login-btn").disabled = true;
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
                $("#email").css("border-color", "#625644")
                $("#pswd").css("border-color", "#625644")
                return response;
            },
            error: function (res) {
                alert(res.responseJSON.Error_message)
                document.getElementById("form-login-btn").disabled = false;
                $("#email").css("border-color", "red")
                $("#pswd").css("border-color", "red")
            }
        });
    })
    $("#logout-btn").on('click', () => {
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
                window.location.reload()
                return "ok";
            },
            error: function (res) {
                alert(res)
            }
        });
    })
    //welcome container wala login btn
    $('#login-btn').on('click', () => {
        $("#email").css("border-color", "#625644")
        $("#pswd").css("border-color", "#625644")
        $('#signUpForm').css("display", "none")
        $("#forgetPasswordForm").css("display", "none")
        $("#resetNewPasswordForm").css("display", "none")
        $('#loginForm').css("display", "block")
        document.getElementById('id01').style.display = 'flex'
    })

    //signup button click action
    $(".form-signUp-btn,#wlcm-wala-signUp-btn").on('click', () => {
        document.getElementById('id01').style.display = 'flex'
        $('#signUpForm').css("display", "flex")
        $('.credentials').css("display", "flex")
        $('#loginForm').css("display", "none")
        $("#forgetPasswordForm").css("display", "none")
        $("#resetNewPasswordForm").css("display", "none")
        document.getElementById("loginForm").reset();
        $("#email").css("border-color", "#625644")
        $("#pswd").css("border-color", "#625644")

    })

    //to validate that user has entered correct email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    //signup form submission
    $("#signUpForm").submit((e) => {
        document.getElementById("signUpForm-signUp-btn").disabled = true;
        e.preventDefault();
        const userName = $('#signUpUserName').val();
        const userEmail = $('#signUpEmail').val();
        const password = $('#newPassword').val();
        const confirmPassword = $('#confirmNewPassword').val()
        if (validateEmail(userEmail)) {
            if (password == confirmPassword) {
                const Data = { userName: userName, userEmail: userEmail, password: password }
                const url = '/userSignUp'
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(Data),// serializes the form's elements.
                    contentType: 'application/json',
                    success: function (res) {
                        document.getElementById("signUpForm").reset();
                        $('#signUpEmail').css("border-color", "#625644")
                        $('#otpVerificationForm').css("display", "flex")
                        document.getElementById('userEmailId').value = res.userEmail
                        $("#signUpForm").css("display", "none")
                        alert(res.message)
                        console.log(res.message)
                    },
                    error: function (res) {
                        $('#signUpEmail').css("border-color", "red")
                        alert(res.responseJSON)
                        document.getElementById("signUpForm-signUp-btn").disabled = false;
                        console.log(res.responseJSON)
                    }
                });
            }
            else {
                alert("Password does not match confirm password!!");    //The pop up alert for an unmatch password
                $('#newPassword').css("border-color", "red")
                $('#confirmNewPassword').css("border-color", "red")
                return false;
            }
        }
        else {
            alert("Invalid Email!!");    //The pop up alert for an unmatch password
            $('#signUpEmail').css("border-color", "red")
            return false;
        }

    })
    //otp verification
    $("#otpSubmit-btn").on('click', () => {
        const otp = $('#signUpOtp').val()
        const userEmail = document.getElementById('userEmailId').value
        document.getElementById('userEmailId').value = '';
        const data = { otp: otp, userEmail: userEmail }
        const url = '/userOTPverification'
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {

                $('#otpVerificationForm').css("display", "none")
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
                $('#signUpOtp').css("border-color", "red")
                $('#signUpOtp').val('');
            }
        });
    })
    function resendOTP() {
        const data = { email: $('#userEmailId').val() }
        const url = '/resendUserOTP';
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {
                $("#verifyResendForm").css("display", "none");
                $('#otpVerificationForm').css("display", "flex");
                $('#emailForResend').css("border-color", "#625644");
                $("#verifyResendForm").css("display", "none")
                alert(res.message)
                console.log(res.message)
            },
            error: function (res) {
                $('#emailForResend').css("border-color", "red");
                alert(res.responseJSON.message)
                console.log(res.responseJSON.message)
            }
        });
    }
    //resend otp if otp does not reach or if also otp expired
    $("#resendSignUpOtp").on('click', () => {
        resendOTP();
    })
    //resend opt for the users who forget or failed to varify themselves
    $("#verifyAccount-btn").on('click', () => {
        $("#signUpForm").css("display", "none");
        $("#loginForm").css("display", "none");
        $("#verifyResendForm").css("display", "flex")
        $('#signUpEmail').css("border-color", "#625644")
        document.getElementById("signUpForm").reset();
    })
    //resend otp form
    $("#verifyResendForm").submit((event) => {
        event.preventDefault();
        document.getElementById('userEmailId').value = $('#emailForResend').val()
        resendOTP();
    })
    //back to login page
    $("#backToLogin-btn").on('click', () => {
        $("#email").css("border-color", "#625644")
        $("#pswd").css("border-color", "#625644")
        $('#signUpForm').css("display", "none");
        $('#loginForm').css("display", "block");
    })

    //forget password
    $("#forgetPasswordLink").on('click', () => {
        $("#forgetPasswordForm").css("display", "block")
        $('#signUpForm').css("display", "none");
        $('#loginForm').css("display", "none");
        $("#forgetOTPSubmit-btn").attr("disabled", true);
    })
    $("#forgetPasswordForm").submit((event) => {
        event.preventDefault();
        const data = { email: $("#emailForForgetPassword").val() }
        const url = "/forgetPassword"
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {
                $("#forgetOTPSubmit-btn").removeAttr("disabled");
                alert(res.message)
                console.log(res.message)
            },
            error: function (res) {
                alert(res.responseJSON.message)
                console.log(res.responseJSON.message)
            }
        });
    })
    $("#forgetOTPSubmit-btn").on('click', () => {
        const otp = $("#forgetPasswordOTP").val()
        const data = { email: $("#emailForForgetPassword").val(), otp: otp };
        const url = '/resetPasswordOTPverification'
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (res) {
                $("#resetNewPasswordForm").css("display", "block")
                $("#forgetPasswordOTP").css("border-color", "#625644")
                $("#forgetPasswordForm").css("display", "none")
                document.getElementById('userEmailId').value = res.requestId
                document.getElementById("forgetPasswordOTP").value = ""
                $("#newResetPassword").val() = ""
                $("#confirmNewResetPassword").val() = ""
                alert(res.message)
                console.log(res.message)
            },
            error: function (res) {
                $("#forgetPasswordOTP").css("border-color", "red")
                alert(res.responseJSON.message)
                console.log(res.responseJSON.message)
            }
        });
    })
    $("#resetNewPasswordForm").submit((e) => {
        e.preventDefault();
        if ($("#confirmNewResetPassword").val() == $("#newResetPassword").val()) {
            const reqId = document.getElementById('userEmailId').value;
            const url = '/newPasswordReset';
            const data = { newPassword: $("#newResetPassword").val(), reId: reqId };
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),// serializes the form's elements.
                contentType: 'application/json',
                success: function (res) {
                    $("#resetNewPasswordForm").css("display", "none")
                    $("#forgetPasswordForm").css("display", "none")
                    document.getElementById('userEmailId').value = res.requestId
                    $("#confirmNewResetPassword").css("border-color", "#625644")
                    $("#newResetPassword").css("border-color", "#625644")
                    document.getElementById('id01').style.display = 'none'
                    alert(res.message)
                    console.log(res.message)
                },
                error: function (res) {
                    alert(res.responseJSON.message)
                    console.log(res.responseJSON.message)
                }
            });
        }
        else {
            $("#confirmNewResetPassword").css("border-color", "red")
            $("#newResetPassword").css("border-color", "red")
            alert("Both password does not match")
            console.log("Both password does not match")
        }

    })
})