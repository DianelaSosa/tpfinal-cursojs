$(document).ready(function(){
    var pregunta_actual = 1;
    var pregunta_1 = "¿A qué saga pertenece el personaje de Katniss Everdeen?";
    var respuestas_1 = ["Divergente", "Los juegos del hambre", "La quinta ola", "Crepúsculo"];
    var pregunta_2 = "¿Cuál es la persona con más seguidores en Instagram?";
    var respuestas_2 = ["Lionel Messi", "Miley Cyrus", "Cristiano Ronaldo", "Selena Gómez", "Taylor Swift"];
    var pregunta_3 = "¿Cuál es el animal más grande del mundo?";
    var respuestas_3 = ["Elefante", "Anaconda", "Orca", "Oso polar", "Ballena azul", "Jirafa"];
    var pregunta_4 = "¿Cuál es el país más grande del mundo?";
    var respuestas_4 = ["Canadá", "Argentina", "Estados Unidos", "Rusia", "Brasil"];
    var pregunta_5 = "¿Con quién está casada Katy Perry?";
    var respuestas_5 = ["Orlando Bloom", "Russell Brand", "Travie McCoy"];

    var preg_resp = [{
        pregunta: "¿A qué saga pertenece el personaje de Katniss Everdeen?",
        respuestas: ["Divergente", "Los juegos del hambre", "La quinta ola", "Crepúsculo"]
    },
    {
        pregunta: "¿Cuál es la persona con más seguidores en Instagram?",
        respuestas: ["Lionel Messi", "Miley Cyrus", "Cristiano Ronaldo", "Selena Gómez", "Taylor Swift"]
    },
    {
        pregunta: "¿Cuál es el animal más grande del mundo?",
        respuestas: ["Elefante", "Anaconda", "Orca", "Oso polar", "Ballena azul", "Jirafa"]
    },
    {
        pregunta: "¿Cuál es el país más grande del mundo?",
        respuestas: ["Canadá", "Argentina", "Estados Unidos", "Rusia", "Brasil"]
    },
    {
        pregunta: "¿Con quién está casada Katy Perry?",
        respuestas: ["Orlando Bloom", "Russell Brand", "Travie McCoy"]
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
            if ((pregunta_actual === 1 && checked_option === "option2") ||
                (pregunta_actual === 2 && checked_option === "option3") ||
                (pregunta_actual === 3 && checked_option === "option5") ||
                (pregunta_actual === 4 && checked_option === "option4") ||
                (pregunta_actual === 5 && checked_option === "option1")) {
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

                //Según el número de pregunta, cambio la texto de la pregunta y sus respectivas opciones
                $("#num_question").text(pregunta_actual);
                $("#options").empty();

                $("#question").text(preg_resp[pregunta_actual-1].pregunta);
                cargarOpciones(preg_resp[pregunta_actual-1].respuestas);
                
                // switch(pregunta_actual) {
                //     case 1: 
                //         //console.log(pregunta_1);
                //         $("#question").text(pregunta_1);

                //         cargarOpciones(respuestas_1);
                //         break;
                //     case 2: 
                //         //console.log(pregunta_2);
                //         $("#question").text(pregunta_2);

                //         cargarOpciones(respuestas_2);
                //         break;
                //     case 3: 
                //         //console.log(pregunta_3);
                //         $("#question").text(pregunta_3);

                //         cargarOpciones(respuestas_3);
                //         break;
                //     case 4: 
                //         //console.log(pregunta_4);
                //         $("#question").text(pregunta_4);

                //         cargarOpciones(respuestas_4);
                //         break;
                //     case 5: 
                //         //console.log(pregunta_5);
                //         $("#question").text(pregunta_5);

                //         cargarOpciones(respuestas_5);
                //         break;
                //     default: break;
                // }
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

        sessionStorage.setItem("puntaje", 0);

        $("#msgResult").text("¡Felicitaciones " + playerName + "! Su puntaje final es: " + score + "/100.");
        $("#msgResult").show();
        $("#finish").hide();
        score = 0
    })

    $("#reset").click(function() {
        //Vuelvo a la pregunta 1:
        pregunta_actual = 1;
        $("#num_question").text(pregunta_actual);
        $("#question").text(pregunta_1);
        $("#options").empty();

        //Oculto todos los mensajes por si están visibles
        $("#msgError").hide();
        $("#msgResult").hide();
        $(".correct-partial-result").hide();
        $(".incorrect-partial-result").hide();
        $("#finish").hide();
        $("#next").show();

        //Seteó el puntaje del jugador en cero:
        sessionStorage.setItem("puntaje", 0);

        cargarOpciones(respuestas_1);
    })

})