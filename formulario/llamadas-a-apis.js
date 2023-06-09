$(document).ready(function(){
    $.ajax({
        url: "https://restcountries.com/v3.1/all",
        method: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#selectCountry");

            data.sort((a, b) => {return a.name.common > b.name.common ? 1 : -1}); //Para que los países se muestren ordenados alfabéticamente en el select
            
            for (let i = 0; i < data.length; i++) {
                var option = $("<option>").text(data[i].name.common).val(data[i].name.common);
                select.append(option);
            }
        },
        error: function() {
            $("#selectCountryFeedback").show(); //alert("[ERROR]: No se pudo obtener los países.");
        }
    });

    $.ajax({
        url: "https://apis.datos.gob.ar/georef/api/provincias",
        method: "GET",
        dataType: "json",
        success: function(data) {
            let select = $("#selectProvince");

            let provincias = data.provincias;

            provincias.sort((a, b) => {return a.id - b.id}); //Para que las provincias se muestren ordenadas alfabéticamente en el select
            //console.log(provincias);
            
            for (let i = 0; i < provincias.length; i++) {
                //let option = $("<option>").text(provincias[i].nombre).val(provincias[i].nombre.toLowerCase());
                let option = $("<option>").text(provincias[i].nombre).val(provincias[i].id);
                select.append(option);
            }
        },
        error: function() {
            $("#selectProvinceFeedback").show(); //alert("[ERROR]: No se pudo obtener las provincias.");
        }
    });

    $("#selectProvince").change(function() {
        //let nameSelectedProvince = $(this).find("option:selected").val().toLowerCase();
        let idSelectedProvince = $(this).find("option:selected").val();
        console.log(idSelectedProvince);
        $.ajax({
            url: `https://apis.datos.gob.ar/georef/api/localidades`,
            method: "GET",
            data: {provincia: idSelectedProvince, campos: "id", max: 1000},
            dataType: "json",
            success: function(data) {
                let select = $("#selectCity");
                select.empty(); //Para limpiar el select ante un cambio en el select de provincias
                
                let localidades = data.localidades;
                localidades.sort((a, b) => {return a.nombre > b.nombre ? 1 : -1}); //Para que las localidades se muestren ordenadas alfabéticamente en el select
                //console.log(localidades);
                
                select.append($("<option>").text("Seleccionar una ciudad").val("0")); //Ya que al limpiar el select también se elimina la opción por defecto
                for (let i = 0; i < localidades.length; i++) {
                    var option = $("<option>").text(localidades[i].nombre).val(localidades[i].id);
                    select.append(option);
                }
            },
            error: function() {
                $("#selectCityFeedback").show(); //alert("[ERROR]: No se pudo obtener las localidades de una provincia.");
            }
        });
    });
});