document.getElementById('engravingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var text = document.getElementById('text').value;
    var font = document.getElementById('font').value;
    var base = document.getElementById('base').value;

    var pendantDiv = document.getElementById('pendant');
    pendantDiv.style.backgroundImage = 'url(' + base + ')';

    var textElement = document.createElement('div');
    textElement.id = 'textElement';
    textElement.style.position = 'absolute';
    textElement.style.fontFamily = font;
    textElement.textContent = text;
    textElement.draggable = true;
    pendantDiv.appendChild(textElement);

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
