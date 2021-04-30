
$(document).ready(() => {

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
                $('#logout-btn').show().css("display","block")

                return response;
            },
            error: function (res) {
                alert(res.responseJSON.Error_message)
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
                    $('#logout-btn').css("display","none")
                    $('#login-btn').css("display","block")
                    document.getElementById("loginForm").reset();
                    return "ok";
                },
                error: function (res) {
                    alert(res)
                }
            });
        })
})