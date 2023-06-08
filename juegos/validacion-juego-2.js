$(document).ready(function() {
    $("#form-game").submit(function(event) {
        event.preventDefault();

        let playerName = $("#nameInput").val();

        if (playerName.length === 0) {
            $("#msgError").show();
        } else {
            $("#msgError").hide();
            location = "juego-preguntas-respuestas.html";
            sessionStorage.setItem('nombre', playerName);
            sessionStorage.setItem('puntaje', 0);
        }
    })
})