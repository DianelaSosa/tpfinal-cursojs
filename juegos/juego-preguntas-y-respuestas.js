$(document).ready(function(){
    var pregunta_actual = 1;

    var preg_resp = [{
        pregunta: "¿A qué saga pertenece el personaje de Katniss Everdeen?",
        opciones: ["Divergente", "Los juegos del hambre", "La quinta ola", "Crepúsculo"],
        respuesta: "option2"
    },
    {
        pregunta: "¿Cuál es la persona con más seguidores en Instagram?",
        opciones: ["Lionel Messi", "Miley Cyrus", "Cristiano Ronaldo", "Selena Gómez", "Taylor Swift"],
        respuesta: "option3"
    },
    {
        pregunta: "¿Cuál es el animal más grande del mundo?",
        opciones: ["Elefante", "Anaconda", "Orca", "Oso polar", "Ballena azul", "Jirafa"],
        respuesta: "option5"
    },
    {
        pregunta: "¿Cuál es el país más grande del mundo?",
        opciones: ["Canadá", "Argentina", "Estados Unidos", "Rusia", "Brasil"],
        respuesta: "option4"
    },
    {
        pregunta: "¿Con quién está casada Katy Perry?",
        opciones: ["Orlando Bloom", "Russell Brand", "Travie McCoy"],
        respuesta: "option1"
    }];

    var playerName = "";
    var score = 0

    $("#next").click(function() {
        $("#msgError").hide();
        //Obtengo la opción seleccionada:
        let checked_option = $("input[name=answers]:checked").val();

        if (checked_option) { //Si el jugador seleccionó una opción
            $("#msgError").hide();

            //Obtengo el puntaje del jugador y corroboro si seleccionó la respuesta correcta
            score = Number(sessionStorage.getItem("puntaje"));

            //Si el jugador acertó en la respuesta, incremento su puntaje en 20 (cada pregunta vale 20 puntos)
            if (preg_resp[pregunta_actual-1].respuesta === checked_option) {
                    score += 20;
                    $(".incorrect-partial-result").hide();
                    $(".correct-partial-result").text("¡Respuesta correcta! Puntaje parcial: " + score + " puntos");
                    
                    $(".correct-partial-result").show();
            } else {
                $(".correct-partial-result").hide();

                $(".incorrect-partial-result").text("¡Respuesta incorrecta! Puntaje parcial: " + score + " puntos");
                $(".incorrect-partial-result").show();
            }
            
            //console.log(score);
            sessionStorage.setItem("puntaje", score);

            //Paso a la siguiente pregunta:
            pregunta_actual++;

            if (pregunta_actual <= 5) {
                //console.log(pregunta_actual);

                //Cambio el texto de la pregunta y sus respectivas opciones
                $("#num_question").text(pregunta_actual+"/5");
                $("#options").empty();

                $("#question").text(preg_resp[pregunta_actual-1].pregunta);
                cargarOpciones(preg_resp[pregunta_actual-1].opciones);
            }

            //Si el jugador está en la última pregunta, oculto el mensaje de "Siguiente" ya que no hay más preguntas y hago visible el botón finalizar para mostrarle el puntaje
            if (pregunta_actual > 5) {
                $("#finish").show();
                $("#next").hide();
            }
        } else { //Si el jugador no seleccionó ninguna respuesta, muestro mensaje de error:
            $(".correct-partial-result").hide();
            $(".incorrect-partial-result").hide();
            $("#msgError").show();
        }
    })

    function cargarOpciones(respuestas) {
        for (let i = 0; i < respuestas.length; i++) {
            let div = $("<div>").attr({class: "form-check form-check-inline"});
            let input = $("<input>").attr({id: "option"+(i+1), name: "answers", type: "radio", class: "form-check-input"}).val("option"+(i+1));
            let label = $("<label>").attr({class: "form-check-label", for: "option"+(i+1)}).text(respuestas[i]);
            $("#options").append(div);
            div.append(input);
            div.append(label);
        }
    }

    $("#finish").click(function() {
        playerName = sessionStorage.getItem("nombre");
        score = sessionStorage.getItem("puntaje");

        $(".msgResult").text(playerName + ", tu puntaje final es: " + score + "/100.");

        if (score > 50) {
            $(".alert-success").show();
        } else {
            $(".alert-danger").show();
        }

        score = 0;
        sessionStorage.setItem("puntaje", score);

        $("#finish").hide();
        $(".correct-partial-result").hide();
        $(".incorrect-partial-result").hide();
    })

    $("#reset").click(function() {
        //Vuelvo a la pregunta 1:
        pregunta_actual = 1;
        $("#num_question").text(pregunta_actual+"/5");
        $("#question").text(preg_resp[pregunta_actual-1].pregunta);
        $("#options").empty();
        cargarOpciones(preg_resp[pregunta_actual-1].opciones);

        //Oculto todos los mensajes por si están visibles
        $("#msgError").hide();
        $(".alert").hide();
        $(".correct-partial-result").hide();
        $(".incorrect-partial-result").hide();
        
        $("#finish").hide();
        $("#next").show();

        //Seteó el puntaje del jugador en cero:
        score = 0;
        sessionStorage.setItem("puntaje", score);
    })
})