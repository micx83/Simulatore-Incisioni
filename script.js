var selectedElement = null;

document.getElementById('engravingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var text = document.getElementById('text').value;
    var font = document.getElementById('font').value;
    var base = document.getElementById('base').value;

    var pendantDiv = document.getElementById('pendant');
    pendantDiv.style.backgroundImage = 'url(' + base + ')';
    pendantDiv.style.display = 'flex';
    pendantDiv.style.justifyContent = 'center';
    pendantDiv.style.alignItems = 'center';

    var textElement = document.createElement('div');
    textElement.id = 'textElement';
    textElement.style.position = 'absolute';
    textElement.style.fontFamily = font;
    textElement.textContent = text;
    textElement.draggable = true;
    textElement.style.resize = 'both';
    textElement.style.overflow = 'auto';
    pendantDiv.appendChild(textElement);

    var deleteElement = document.createElement('div');
    deleteElement.textContent = 'x';
    deleteElement.style.display = 'none';
    deleteElement.style.fontFamily = 'Arial'; // Imposta il font-family su Arial
    textElement.appendChild(deleteElement);

    deleteElement.addEventListener('click', function() {
        textElement.remove();
    });

    textElement.addEventListener('mouseover', function() {
        deleteElement.style.display = 'block';
    });

    textElement.addEventListener('mousedown', function() {
        selectedElement = textElement;
    });
});

document.addEventListener('mousemove', function(event) {
    if (selectedElement) {
        var rect = pendant.getBoundingClientRect();
        selectedElement.style.left = event.clientX - rect.left - (selectedElement.offsetWidth / 2) + 'px';
        selectedElement.style.top = event.clientY - rect.top - (selectedElement.offsetHeight / 2) + 'px';
    }
});

document.addEventListener('mouseup', function() {
    selectedElement = null;
});