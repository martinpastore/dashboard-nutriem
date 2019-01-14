$('#news').submit(function (e){
    e.preventDefault();
    e.stopPropagation();

    $('#message').text('');

    const form = e.currentTarget.id;
    if ($('#inputImagen')[0].files[0]) {
        getBase64($('#inputImagen')[0].files[0])
            .then((data) => {
                const news = {
                    fecha: getDate(),
                    image: data,
                    titulo: $('#inputTitulo').val(),
                    contenido: replaceBreakLines()
                };

                sendRequest(news);
            });
    } else {
        const news = {
            fecha: getDate(),
            image: '',
            titulo: $('#inputTitulo').val(),
            contenido: replaceBreakLines()
        };

        sendRequest(news);
    }
});

function sendRequest(news) {
    httpRequest('POST', '/news', news)
        .then(function(data) {
            data = JSON.parse(data);
            $('#message').addClass(data.class);
            $('#message').text(data.message);
            cleanFields();
        })
        .catch(function (error) {
            error = JSON.parse(error);
            $('#message').addClass(error.class);
            $('#message').text(error.message);
        })
}

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

function getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function replaceBreakLines() {
    const str = $('#inputContenido').val().replace(/(?:\r\n|\r|\n)/g, '<br>');
    return str;
}

function cleanFields() {
    $('#inputImagen').val('');
    $('.custom-file-label').text('Imagen');
    $('#inputContenido').val('');
    $('#inputTitulo').val('');
}

function markSelectedText () {
    var textarea = document.getElementById('inputContenido');
 
    var len = textarea.value.length;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var sel = textarea.value.substring(start, end);
   
    var replace = '<b>' + sel + '</b>';
   
    textarea.value =  textarea.value.substring(0,start) + replace + textarea.value.substring(end,len);
}