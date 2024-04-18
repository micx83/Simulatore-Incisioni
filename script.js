var selectedElement = null;

document.getElementById('engravingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var text = document.getElementById('text').value;
    var font = document.getElementById('font').value;
    var base = document.getElementById('base').value;

    var textElement = document.createElement('div');
    textElement.style.fontFamily = font;
    textElement.textContent = text;
    textElement.style.position = 'absolute';
    textElement.style.cursor = 'move';
    textElement.style.width = '200px';
    textElement.style.height = '100px';
    textElement.style.textAlign = 'center';
    textElement.style.lineHeight = '100px';

    var deleteElement = document.createElement('div');
    deleteElement.textContent = 'X';
    deleteElement.style.position = 'absolute';
    deleteElement.style.top = '0';
    deleteElement.style.right = '0';
    deleteElement.style.backgroundColor = 'red';
    deleteElement.style.color = 'white';
    deleteElement.style.cursor = 'pointer';
    deleteElement.style.display = 'none';
    deleteElement.style.margin = '5px';  // Aggiunto margine

    deleteElement.addEventListener('click', function() {
        document.getElementById('pendant').removeChild(textElement);
    });

    textElement.appendChild(deleteElement);

    document.getElementById('pendant').appendChild(textElement);

    var isResizing = false;
    var resizeDirection = '';

    textElement.addEventListener('mousedown', function(e) {
        if (e.offsetX > textElement.offsetWidth - 10) {
            isResizing = true;
            resizeDirection = 'x';
        }
        else if (e.offsetY > textElement.offsetHeight - 10) {
            isResizing = true;
            resizeDirection = 'y';
        }
        deleteElement.style.display = 'block';  // Mostra l'elemento di cancellazione
    });

    textElement.addEventListener('mouseover', function() {
        deleteElement.style.display = 'block';  // Mostra l'elemento di cancellazione
    });

    textElement.addEventListener('mouseout', function() {
        if (!isResizing) {
            deleteElement.style.display = 'none';  // Nasconde l'elemento di cancellazione
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            if (resizeDirection === 'x') {
                var newWidth = e.clientX - textElement.getBoundingClientRect().left;
                textElement.style.width = newWidth + 'px';
            }
            else if (resizeDirection === 'y') {
                var newHeight = e.clientY - textElement.getBoundingClientRect().top;
                textElement.style.height = newHeight + 'px';
            }
        }
    });

    document.addEventListener('mouseup', function() {
        isResizing = false;
        resizeDirection = '';
        if (!textElement.contains(document.elementFromPoint(event.clientX, event.clientY))) {
            deleteElement.style.display = 'none';  // Nasconde l'elemento di cancellazione
        }
    });
});