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
        var closeButton = $('<span class="closeButton">x</span>');
        textOutputElement.text(textElement.val());
        textOutputElement.css('font-family', fontElement.val());
        closeButton.appendTo(textOutputElement);
        textOutputElement.appendTo(pendantElement);
        textOutputElement.draggable();
        textOutputElement.resizable({
            resize: function() {
                var scale = Math.sqrt(textOutputElement.width() * textOutputElement.height()) / 10;
                textOutputElement.css('font-size', scale + 'px');
            }
        });

        closeButton.on('click', function() {
            textOutputElement.remove();
        });
    });
});