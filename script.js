$(document).ready(function() {
    var textElement = $('#textElement');
    var fontElement = $('#font');
    var baseElement = $('#base');
    var pendantElement = $('#pendant');
    var placeholderElement = $('#placeholder');
    var zIndex = 0; 
    var currentTextOutputElement = null;
    var fontSelectorCopy = null;

    var ddData = [
        {
            text: "Charm Cuore",
            value: "images/CHFamilyN.png",
            imageSrc: "images/CHFamilyN_thumbnail.jpg"
        },
        {
            text: "Ciondolo Cuore",
            value: "images/CLCFamilyN.png",
            imageSrc: "images/CLCFamilyN_thumbnail.jpg"
        },
        {
            text: "Ciondolo Tondo",
            value: "images/CLTFamilyN.png",
            imageSrc: "images/CLTFamilyN_thumbnail.jpg"
        },
        {
            text: "Ciondolo Uomo",
            value: "images/CLUFamilyN.png",
            imageSrc: "images/CLUFamilyN_thumbnail.jpg"
        },
        
    ];

    baseElement.ddslick({
        data: ddData,
        width: 300,
        imagePosition: "left",
        onSelected: function(selectedData){
            if (selectedData.selectedData.value) {
                pendantElement.css('background-image', 'url(' + selectedData.selectedData.value + ')');
                placeholderElement.hide();
            } else {
                pendantElement.css('background-image', '');
                placeholderElement.show();
            }
        }   
    });


    $('#engravingForm').on('submit', function(e) {
        e.preventDefault();
    
        var textOutputElement = $('<div class="textOutput"></div>');
        textOutputElement.html(textElement.val().replace(/\n/g, '<br/>')); 
        textElement.val('');
        textOutputElement.css('font-family', fontElement.val());
        textOutputElement.css('font-size','18'); 
        textOutputElement.css('z-index', zIndex++); 
        textOutputElement.css('position', 'absolute'); 

        textOutputElement.on('click', function() {
            currentTextOutputElement = $(this);
            if (fontSelectorCopy) {
                fontSelectorCopy.val(currentTextOutputElement.css('font-family'));
            }
        });

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

        textOutputElement.draggable({
            containment: "#pendant"
        });

        var closeButton = $('<span class="closeButton">x</span>');
        closeButton.on('click', function(e) {
            e.stopPropagation();
            textOutputElement.remove();
 // Check if there are any textOutput elements left
 if ($('.textOutput').length === 0) {
    // If not, remove the font selector copy
    fontSelectorCopy.remove();
    fontSelectorCopy = null;
}


        });

        closeButton.css({
            position: 'absolute',
            top: '-10px',  
            left: '-10px'  
        });

        textOutputElement.append(closeButton);
        textOutputElement.appendTo(pendantElement);

        if (!fontSelectorCopy) {
            fontSelectorCopy = $('#font').clone().attr('id', 'fontCopy');
            fontSelectorCopy.css({
                position: 'absolute',
                left: $('#pendant').offset().left - fontSelectorCopy.outerWidth(),
                top: $('#pendant').offset().top
            });
            fontSelectorCopy.appendTo('body');
            fontSelectorCopy.on('change', function() {
                if (currentTextOutputElement) {
                    currentTextOutputElement.css('font-family', fontSelectorCopy.val());
                }
            });
        }
    });
});

