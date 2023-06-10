$(document).ready(function() {
    $("#myForm").submit(function(event) {
        let error = false;

        //let name = $("#inputName").val();
        //let lastName = $("#inputLastName").val();
        let age = $("#inputAge").val();
        let mail = $("#inputMail").val();
        //let username = $("#inputUsername").val();
        let password1 = $("#inputPassword1").val();
        let password2 = $("#inputPassword2").val();
        
        let ageFeedback = $("#inputAgeFeedback");
        let emailFeedback = $("#inputEmailFeedback");
        let passwordFeedback = $(".inputPasswordFeedback");

        $(".invalid-feedback").hide();

        if (age < 0 || age > 150) {
            error = true;

            ageFeedback.show();
        }

        if (password1 !== password2) {
            error = true;

            passwordFeedback.show();
        }

        if (!/^\S+@\S+\.\S+$/.test(mail)) {
            error = true;

            emailFeedback.show();
        }

        if (error) {
            event.preventDefault();
            //console.log("Formulario completado con errores");
        }
    })
})