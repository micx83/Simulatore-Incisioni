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
        textOutputElement.css('font-size', '16px'); // Imposta la dimensione del font a 16px
    
        // Imposta la larghezza e l'altezza di textOutputElement per corrispondere a quelle di textElement
        textOutputElement.css('width', textElement.width() + 'px');
        textOutputElement.css('height', textElement.height() + 'px');
        
        var closeButton = $('<span class="closeButton">x</span>');
        closeButton.on('click', function() {
            textOutputElement.remove();
        });
        textOutputElement.append(closeButton);

        textOutputElement.appendTo(pendantElement);
        textOutputElement.draggable({ containment: "parent" }); // Contenimento all'interno dell'elemento genitore

        // Crea un elemento div per il handle di ridimensionamento
        var resizeHandle = $('<div></div>');
        resizeHandle.css({
            'width': '10px',
            'height': '10px',
            'background': 'red',
            'position': 'absolute',
            'right': '0',
            'bottom': '0',
            'cursor': 'se-resize'
        });
        textOutputElement.append(resizeHandle);

        // Variabili per tenere traccia dello stato del ridimensionamento
        var isResizing = false;
        var lastDownX = 0;
        var lastDownY = 0;

        // Evento mousedown per iniziare il ridimensionamento
        resizeHandle.on('mousedown', function(e) {
            isResizing = true;
            lastDownX = e.clientX;
            lastDownY = e.clientY;
        });

        // Evento mousemove per effettuare il ridimensionamento
        $(window).on('mousemove', function(e) {
            if (!isResizing) 
                return;
            var offsetX = e.clientX - lastDownX;
            var offsetY = e.clientY - lastDownY;
            textOutputElement.css('width', (offsetX + textOutputElement.width()) + 'px');
            textOutputElement.css('height', (offsetY + textOutputElement.height()) + 'px');
            lastDownX = e.clientX;
            lastDownY = e.clientY;
        });

        // Evento mouseup per terminare il ridimensionamento
        $(window).on('mouseup', function(e) {
            isResizing = false;
        });
    });
});