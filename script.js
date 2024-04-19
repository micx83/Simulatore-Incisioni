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
        textOutputElement.css('width', 'auto');
        textOutputElement.css('height', 'auto');

        var dragHandle = $('<div class="drag-handle">Trascina qui</div>');
        textOutputElement.prepend(dragHandle);

        var closeButton = $('<span class="closeButton">x</span>');
        closeButton.on('click', function() {
            textOutputElement.remove();
        });
        textOutputElement.append(closeButton);

        textOutputElement.appendTo(pendantElement);
        textOutputElement.draggable({ containment: "parent", handle: ".drag-handle" }); // Contenimento all'interno dell'elemento genitore
        textOutputElement.resizable({
            resize: function() {
                var scale = Math.sqrt(textOutputElement.width() * textOutputElement.height()) / 2;
                textOutputElement.css('font-size', scale + 'px');
            }
        });

        closeButton.on('click', function() {
            textOutputElement.remove();
        });
    });
});