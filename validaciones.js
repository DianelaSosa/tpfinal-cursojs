$(document).ready(function() {
    let name = $("#inputName").val();
    let lastName = $("#inputLastName").val();
    let age = $("#inputAge").val();
    let mail = $("#inputMail").val();
    let username = $("#inputUsername").val();
    let password1 = $("#inputPassword").val();
    let password2 = $("#inputPassword2").val();
    let error = false;



    $("#myForm").submit(function(event) {
        console.log(holaa);
        if (age < 0 || age > 150) {
            //let hidden = age.getAttribute("hidden");
            let ageFeedback = $("#inputAgeFeedback");
            error = true;
            ageFeedback.removeAttribute("hidden");
            console.log(error);
        }
        if (!error) {
            event.preventDefault();
        }
    })
})