$(document).ready(function() {
    var textElement = $('#textElement');
    var fontElement = $('#font');
    var baseElement = $('#base');
    var pendantElement = $('#pendant');
    var textOutputElement = $('<div id="textOutput"></div>');

    textElement.on('input', function() {
        textOutputElement.text(textElement.val());
        textOutputElement.css('font-family', fontElement.val());
        textOutputElement.appendTo(pendantElement);
    });

    baseElement.on('change', function() {
        pendantElement.css('background-image', 'url(' + baseElement.val() + ')');
    });

    // Aggiungi qui il codice per spostare, ridimensionare ed eliminare il testo
    textOutputElement.draggable();
    textOutputElement.resizable();

    // Elimina il testo quando si fa clic su di esso
    textOutputElement.on('click', function() {
        $(this).remove();
    });
});