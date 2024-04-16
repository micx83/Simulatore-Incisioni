document.getElementById('engravingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var text = document.getElementById('text').value;
    var font = document.getElementById('font').value;
    var pendant = document.getElementById('pendant').value;
    var image = document.getElementById('image').value;

    var pendantDiv = document.getElementById('pendant');
    pendantDiv.style.backgroundImage = 'url(' + pendant + '.png)';

    var engravingArea = document.getElementById('engravingArea');
    engravingArea.style.fontFamily = font;
    engravingArea.textContent = text;

    var engravingImage = document.getElementById('engravingImage');
    engravingImage.src = image + '.png';
});

var engravingArea = document.getElementById('engravingArea');
var engravingImage = document.getElementById('engravingImage');

[engravingArea, engravingImage].forEach(function(element) {
    element.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', element.id);
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
    var dropzone = event.target;
    dropzone.appendChild(draggableElement);
    draggableElement.style.left = event.clientX - dropzone.offsetLeft + 'px';
    draggableElement.style.top = event.clientY - dropzone.offsetTop + 'px';
});