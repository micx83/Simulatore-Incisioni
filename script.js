$(document).ready(function() {
    var textElement = $('#textElement');
    var fontElement = $('#font');
    var baseElement = $('#base');
    var pendantElement = $('#pendant');
    var placeholderElement = $('#placeholder');
    var imageSelectionElement = $('#imageSelection');
    var zIndex = 0; 
    var currentTextOutputElement = null;
    var fontSelectorCopy = null;

    pendantElement.css({
        'position': 'relative'
    });

    var ddData = [
        {
            text: "Charm Cuore",
            value: "images/CHFamilyN.png",
            imageSrc: "images/CHFamilyN.png"
        },
        {
            text: "Ciondolo Cuore",
            value: "images/CLCFamilyN.png",
            imageSrc: "images/CLCFamilyN.png"
        },
        {
            text: "Ciondolo Tondo",
            value: "images/CLTFamilyN.png",
            imageSrc: "images/CLTFamilyN.png"
        },
        {
            text: "Ciondolo Uomo",
            value: "images/CLUFamilyN.png",
            imageSrc: "images/CLUFamilyN.png"
        },
    ];

    baseElement.ddslick({
        data: ddData,
        width: 200,
        imagePosition: "left",
        selectText: "Scegli la Base",
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

    var imageSelectionData = [
        {
            text: "Omino",
            value: "grafic/omino1.png",
            imageSrc: "grafic/omino1.png"
        },
        {
            text: "Donnina",
            value: "grafic/donnina.png",
            imageSrc: "grafic/donnina.png"
        },
        // Add more images here...
    ];

    var imageSelectorLabel = $('<p>').text('Vuoi creare un Disegno Personalizzato?').css({
        'font-size': '12px', // rendi il testo più piccolo
        'text-align': 'center' // centra il testo
    }).attr('id', 'imageSelectorLabel'); // aggiungi un id all'elemento p per poterlo rimuovere facilmente in seguito
    
    imageSelectorLabel.insertBefore(imageSelectionElement); // inserisci il testo prima del selettore di immagini

    imageSelectionElement.ddslick({
        data: imageSelectionData,
        width: 200,
        imagePosition: "left",
        selectText: "Scegli gli Elementi",
        onSelected: function(selectedData){
            // Aggiungi l'ID all'elemento generato da ddslick
            $('.dd-container').attr('id', 'imageSelection');
    
            if (selectedData.selectedData.value) {
                var img = $('<img class="selectedImage" src="' + selectedData.selectedData.value + '">').css({
                    'width': '100%',
                    'height': '100%'
                });
            
                var imgElement = $('<div class="imageContainer"></div>').css({
                    'width': '50px',
                    'height': '50px',
                    'position': 'absolute'
                }).append(img).append('<div class="closeButton">X</div>');
            
                imgElement.css({
                    'z-index': zIndex++
                });
            
                imgElement.draggable({
                    containment: "#pendant"
                });
            
                imgElement.find('.closeButton').click(function() {
                    imgElement.remove();
                });
            
                // Rendi ridimensionabile l'elemento div che contiene l'immagine
                imgElement.resizable({
                    aspectRatio: true,
                    minHeight: 30,
                    minWidth: 30
                });
            
                pendantElement.append(imgElement);
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
            if ($('.textOutput').length === 0) {
                fontSelectorCopy.remove();
                fontSelectorCopy = null;
                $('#fontLabel').remove();
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
                right: $('#pendant').offset().left - fontSelectorCopy.outerWidth(),
                top: $('#pendant').offset().top + 20
            });
        
            var fontLabel = $('<p>').text('Modifica il font').css({
                position: 'absolute',
                right: $('#pendant').offset().left - fontSelectorCopy.outerWidth(),
                top: $('#pendant').offset().top - 10, // posiziona il testo 15px sopra fontSelectorCopy
                'font-size': '12px' // rendi il testo più piccolo
            }).attr('id', 'fontLabel'); // aggiungi un id all'elemento p per poterlo rimuovere facilmente in seguito
        
            fontLabel.appendTo('body'); // Aggiungi l'elemento p al body
            fontSelectorCopy.appendTo('body');
        
            fontSelectorCopy.on('change', function() {
                if (currentTextOutputElement) {
                    currentTextOutputElement.css('font-family', fontSelectorCopy.val());
                }
            });
        }
        
    });
});      