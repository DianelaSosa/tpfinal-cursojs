$(document).ready(function() {
    $("#myForm").submit(function(event) {
        event.preventDefault();

        let error = false;
        let shortPassword = false;

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
        let passwordFeedback1 = $("#inputPasswordFeedback1");

        $(".invalid-feedback").hide();
        $(".alert").hide();

        if (age < 0 || age > 150) {
            error = true;

            ageFeedback.show();
        }

        if (!/^\S+@\S+\.\S+$/.test(mail)) {
            error = true;

            emailFeedback.show();
        }

        if (password1.length < 8) {
            error = true;
            shortPassword = true;

            passwordFeedback1.text("La contraseña no tiene como mínimo 8 caracteres.");
            passwordFeedback1.show();
        }

        if (password1 !== password2) {
            error = true;

            if (!shortPassword) {
                passwordFeedback1.text("Las contraseñas no son iguales.");
            }

            passwordFeedback.show();
        }

        if (!error) {
            $(".alert").show();
        } else {
            //console.log("Formulario completado con errores");
        }
    })
})