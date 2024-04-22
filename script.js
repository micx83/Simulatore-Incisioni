$(document).ready(function() {
    var textElement = $('#textElement');
    var fontElement = $('#font');
    var baseElement = $('#base');
    var pendantElement = $('#pendant');
    var placeholderElement = $('#placeholder');
    var zIndex = 0; 

    baseElement.on('change', function() {
        if (baseElement.val()) {
            var img = new MarvinImage();
            img.load(baseElement.val(), function() {
                // Convert the image to grayscale
                Marvin.grayScale(img, img);

                // Find the edges of the image
                Marvin.prewitt(img, img);

                // Find the width of the jewel image
                var maxWidth = findMaxWidth(img);

                // Set the maximum width of the text to the width of the jewel image
                textElement.css('max-width', maxWidth + 'px');

                pendantElement.css('background-image', 'url(' + baseElement.val() + ')');
                placeholderElement.hide();
            });
        } else {
            pendantElement.css('background-image', '');
            placeholderElement.show();
        }
    });

    $('#engravingForm').on('submit', function(e) {
        e.preventDefault();
    
        var textOutputElement = $('<div class="textOutput"></div>');
        textOutputElement.html(textElement.val().replace(/\n/g, '<br/>')); 
    
        textOutputElement.css('font-family', fontElement.val());
        textOutputElement.css('font-size','18'); 
        textOutputElement.css('z-index', zIndex++); 
        textOutputElement.css('position', 'absolute'); 
    
        textOutputElement.resizable({
            start: function(event, ui) {
                $(this).data('startFontSize', parseInt($(this).css('font-size')));
                $(this).data('startWidth', ui.size.width);
                $(this).data('startHeight', ui.size.height);
            },
            resize: function(event, ui) {
                var widthChange = ui.size.width - $(this).data('startWidth');
                var heightChange = ui.size.height - $(this).data('startHeight');
        
                var newFontSize = $(this).data('startFontSize') + Math.min(widthChange, heightChange) / 2;
        
                $(this).css({
                    'font-size': newFontSize + 'px',
                    height: 'auto',
                    width: 'auto'
                });
            }
        });

        fontElement.on('change', function() {
            $('.textOutput').css('font-family', fontElement.val());
        });

        textOutputElement.draggable({
            containment: "#pendant"
        });

        var closeButton = $('<span class="closeButton">x</span>');
        closeButton.on('click', function(e) {
            e.stopPropagation();
            textOutputElement.remove();
        });

        closeButton.css({
            position: 'absolute',
            top: '-10px',  
            left: '-10px'  
        });

        textOutputElement.append(closeButton);
        textOutputElement.appendTo(pendantElement);
    });
});

function findMaxWidth(img) {
    var maxWidth = 0;
    for (var y = 0; y < img.getHeight(); y++) {
        for (var x = 0; x < img.getWidth(); x++) {
            if (img.getIntColor(x, y) != 0) {
                maxWidth = Math.max(maxWidth, x);
            }
        }
    }
    return maxWidth;
}