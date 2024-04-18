var selectedElement = null;
var textElement = document.getElementById('text'); // Ora seleziona l'elemento con l'ID 'text'

textElement.addEventListener('mousedown', function(e) {
    selectedElement = textElement;
    if (e.offsetX > textElement.offsetWidth - 10) {
        isResizing = true;
        resizeDirection = 'x';
    }
    else if (e.offsetY > textElement.offsetHeight - 10) {
        isResizing = true;
        resizeDirection = 'y';
    }
    if (e.offsetX > textElement.offsetWidth - 10 && e.offsetY > textElement.offsetHeight - 10) {
        isResizingText = true;
    }
});

document.addEventListener('mousemove', function(e) {
    if (selectedElement) {
        if (isResizing) {
            if (resizeDirection === 'x') {
                var newWidth = e.clientX - selectedElement.getBoundingClientRect().left;
                selectedElement.style.width = newWidth + 'px';
            }
            else if (resizeDirection === 'y') {
                var newHeight = e.clientY - selectedElement.getBoundingClientRect().top;
                selectedElement.style.height = newHeight + 'px';
            }
        }
        if (isResizingText) {
            var newFontSize = e.clientY - selectedElement.getBoundingClientRect().top;
            selectedElement.style.fontSize = newFontSize + 'px';
        }
    }
});

document.addEventListener('mouseup', function() {
    isResizing = false;
    isResizingText = false;
    resizeDirection = '';
    selectedElement = null;
});