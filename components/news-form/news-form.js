$('#news').submit(function (e){
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.id;
    getBase64($('#inputImagen')[0].files[0])
        .then((data) => {
            const news = {
                image: data,
                titulo: $('#inputTitulo').val(),
                contenido: $('#inputContenido').val()
            };

            httpRequest('POST', '/news', news)
                .then(function(data) {
                    data = JSON.parse(data);
                    $('#message').addClass(data.class);
                    $('#message').text(data.message);
                })
                .catch(function (error) {
                    error = JSON.parse(error);
                    $('#message').addClass(error.class);
                    $('#message').text(error.message);
                })
        });
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function updateLabel() {
    const label = $('#inputImagen')[0].files[0].name;
    $('.custom-file-label').text(label);
}