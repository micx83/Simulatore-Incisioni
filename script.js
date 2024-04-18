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
    textElement.appendChild(deleteElement);

    deleteElement.addEventListener('click', function() {
        textElement.remove();
    });

    textElement.addEventListener('mouseover', function() {
        deleteElement.style.display = 'block';
    });

    textElement.addEventListener('mouseout', function() {
        deleteElement.style.display = 'none';
    });

    textElement.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', textElement.id);
    });
});

var pendant = document.getElementById('pendant');

pendant.addEventListener('dragover', function(event) {
    event.preventDefault();
});

pendant.addEventListener('drop', function(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData('text');
    var draggableElement = document.getElementById(id);
    if (draggableElement) {
        var rect = pendant.getBoundingClientRect();
        draggableElement.style.left = event.clientX - rect.left - (draggableElement.offsetWidth / 2) + 'px';
        draggableElement.style.top = event.clientY - rect.top - (draggableElement.offsetHeight / 2) + 'px';
    }
});