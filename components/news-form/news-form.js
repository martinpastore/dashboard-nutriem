$('#news').submit(function (e){
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.id;

    const news = {
        image: '',
        titulo: $('#inputTitulo').val(),
        contenido: $('#inputContenido').val()
    };

    httpRequest('POST', '/news', news)
        .then(function(data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        })
});