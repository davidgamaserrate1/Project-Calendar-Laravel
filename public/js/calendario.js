document.addEventListener('DOMContentLoaded', function() {

    let formulario = document.querySelector("#formularioEventos");

    var calendarEl = document.getElementById('calendario');

    var calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',
        locale: "pt-br",
        displayEventTime: false,

        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today',


        },
        //events: "http://localhost/calendario/public/evento/mostrar",
        eventSources: {
            url: baseURL + "/evento/mostrar",
            method: "POST",
            extraParams: {
                _token: formulario._token.value
            }
        },

        dateClick: function(info) {
            formulario.reset();
            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;
            $("#evento").modal("show");
        },
        eventClick: function(info) {

            var evento = info.event;
            console.log("dasdas " + info.event.id)

            axios.post(baseURL + "/evento/editar/" + info.event.id).then(
                (resposta) => {

                    formulario.id.value = resposta.data.id;
                    formulario.title.value = resposta.data.title;
                    formulario.descricao.value = resposta.data.descricao;
                    formulario.start.value = resposta.data.start;
                    formulario.end.value = resposta.data.end;
                    $("#evento").modal("show");
                }
            ).catch(
                error => {
                    if (error.response) {
                        console.log("erro : " +
                            error.response.data);
                    }
                }
            )
        }
    });


    calendar.render();


    document.getElementById("btnSalvar").addEventListener("click", function() {
        enviarDados("/evento/adicionar");
    });

    document.getElementById("btnDeletar").addEventListener("click", function() {
        enviarDados("/evento/remover/" + formulario.id.value);
    });

    document.getElementById("btnAlterar").addEventListener("click", function() {
        enviarDados("/evento/atualizar/" + formulario.id.value);
    });

    function enviarDados(url) {

        const dados = new FormData(formulario);

        const novaUrl = baseURL + url

        axios.post(novaUrl, dados)
            .then(
                (resposta) => {
                    calendar.refetchEvents();
                    $("#evento").modal("hide");

                }
            ).catch(
                error => {
                    if (error.response) {
                        console.log("erro :" + error.response.data);
                    }

                }
            )
    }
});
