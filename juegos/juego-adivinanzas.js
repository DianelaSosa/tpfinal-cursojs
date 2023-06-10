$(document).ready(function(){
    var playerName = sessionStorage.getItem("nombre");
    var score = Number(sessionStorage.getItem("puntaje"));

    $("input[type=radio][name=answers-1]").change(function() {
        $("input[name=answers-1]").attr("disabled", true);
        if ($("#option13").is(":checked")) {
            //console.log("Respuesta correcta");

            $("#correct-result-1").show();
            score += 33;
            sessionStorage.setItem("puntaje", score);
        }
        else {
            //console.log("Respuesta incorrecta");

            $("#incorrect-result-1").show();
        }
    });

    $("input[type=radio][name=answers-2]").change(function() {
        $("input[name=answers-2]").attr("disabled", true);
        if ($("#option21").is(":checked")) {
            //console.log("Respuesta correcta");

            $("#correct-result-2").show();
            score += 33;
            sessionStorage.setItem("puntaje", score);
        }
        else {
            //console.log("Respuesta incorrecta");

            $("#incorrect-result-2").show();
        }
    });
    
    $("input[type=radio][name=answers-3]").change(function() {
        $("input[name=answers-3]").attr("disabled", true);
        if ($("#option32").is(":checked")) {
            //console.log("Respuesta correcta");

            $("#correct-result-3").show();
            score += 34;
            sessionStorage.setItem("puntaje", score);
        }
        else {
            //console.log("Respuesta incorrecta");

            $("#incorrect-result-3").show();
        }
    });


    $("#finish").click(function() {
        if (!$("input[name=answers-1]").prop("disabled") || !$("input[name=answers-2]").prop("disabled") || !$("input[name=answers-3]").prop("disabled")) {
            $("#msgError").show();
        } else {
            $("#msgError").hide();

            playerName = sessionStorage.getItem("nombre");
            score = sessionStorage.getItem("puntaje");

            $(".msgResult").text(playerName + ", tu puntaje final es: " + score + "/100.");

            if (score > 50) {
                $(".alert-success").show();
            } else {
                $(".alert-danger").show();
            }

            score = 0;
            sessionStorage.setItem("puntaje", 0);
        }
    })

    $("#reset").click(function() {
        //Seteo el puntaje del jugador en cero:
        score = 0;
        sessionStorage.setItem("puntaje", score);

        //Habilito todas las opciones y deselecciono las opciones seleccionadas:
        $("input[type=radio]").attr("disabled", false);
        $("input[type=radio]").each(function() {$(this).prop("checked", false);});
        
        //Oculto todos los mensajes por si están visibles
        $(".correct-partial-result").hide();
        $(".incorrect-partial-result").hide();
        $(".alert").hide();
    })
})