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

        var textContainer = $('<div class="textContainer"></div>');
        var textOutputElement = $('<div class="textOutput"></div>');
        textOutputElement.text(textElement.val());
        textOutputElement.css('font-family', fontElement.val());
        textOutputElement.appendTo(textContainer);
        textContainer.appendTo(pendantElement);
        textContainer.draggable();
        textContainer.resizable({
            resize: function() {
                var scale = Math.sqrt(textContainer.width() * textContainer.height()) / 10;
                textOutputElement.css('font-size', scale + 'px');
            }