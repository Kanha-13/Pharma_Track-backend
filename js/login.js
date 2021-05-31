
$(document).ready(() => {
    // login button click action 
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        const Email = $('#email').val()
        const Pass = $('#pswd').val()
        const Data = { email: Email, password: Pass }
        const url = '/login';
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(Data),// serializes the form's elements.
            contentType: 'application/json',
            success: function (response) {
                $('.close').click()
                $('#login-btn').hide()
                $('#logout-btn').show().css("display", "block")

                return response;
            },
            error: function (res) {
                alert(res.responseJSON.Error_message)
                document.getElementById("loginForm").reset();
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
                document.getElementById("loginForm").reset();
                return "ok";
            },
            error: function (res) {
                alert(res)
            }
        });
    })
    //signup button click action
    $("#form-signUp-btn").on('click', () => {
        $('#loginForm').css("display", "none")
        $('#signUpForm').css("display", "block")

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
                const Data = { userName:userName,email: userEmail, password: password }
                const url='/signUp'
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(Data),// serializes the form's elements.
                    contentType: 'application/json',
                    success: function (response) {
                        $('.close').click()
                        $('#login-btn').hide()
                        $('#logout-btn').show().css("display", "block")
        
                        return response;
                    },
                    error: function (res) {
                        alert(res.responseJSON.Error_message)
                        document.getElementById("loginForm").reset();
                    }
                });
            }
            else{
                alert("Password does not match confirm password!!");    //The pop up alert for an unmatch password
                return false;
            }
        }
        else{
            alert("Invalid Email!!");    //The pop up alert for an unmatch password
                return false;
        }

    })
    //back to login page
    $("#backToLogin-btn").on('click', () => {
        $('#signUpForm').css("display", "none")
        $('#loginForm').css("display", "block")
    })
})