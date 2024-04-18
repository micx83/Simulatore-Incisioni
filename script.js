$(document).ready(function() {
    var textElement = $('#textElement');
    var fontElement = $('#font');
    var baseElement = $('#base');
    var pendantElement = $('#pendant');
    var placeholderElement = $('#placeholder');

    baseElement.on('change', function() {
        if (baseElement.val()) {
            pendantElement.css('background-image', 'url(' + baseElement.val() + ')');
            placeholderElement.hide();
        } else {
            pendantElement.css('background-image', '');
            placeholderElement.show();
        }
    });
    
        $('#engravingForm').on('submit', function(e) {
            e.preventDefault();
    
            var textOutputElement = $('<div class="textOutput"></div>');
            textOutputElement.text(textElement.val());
            textOutputElement.css('font-family', fontElement.val());
            textOutputElement.appendTo(pendantElement);
            textOutputElement.draggable();
            textOutputElement.resizable();
    
            textOutputElement.on('click', ':before', function() {
                textOutputElement.remove();
            });
        });
    });