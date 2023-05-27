// Acceder a la cámara y mostrar la vista previa del video
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(function(stream) {
    var videoElement = document.getElementById('video');
    videoElement.srcObject = stream;
  })
  .catch(function(error) {
    console.error('Error al acceder a la cámara: ', error);
  });

// Capturar la foto cuando se haga clic en el botón
var captureButton = document.getElementById('captureButton');
captureButton.addEventListener('click', function(e) {
  e.preventDefault()
  var videoElement = document.getElementById('video');
  var canvasElement = document.getElementById('canvas');
  var canvasContext = canvasElement.getContext('2d');

  // Establecer el tamaño deseado del canvas (más pequeño)
  var canvasWidth = 320; // Ancho deseado
  var canvasHeight = 240; // Altura deseada

  // Calcular la escala de dibujo para mantener la relación de aspecto
  var scaleX = videoElement.videoWidth / canvasWidth;
  var scaleY = videoElement.videoHeight / canvasHeight;
  var scale = Math.max(scaleX, scaleY);

  // Calcular el tamaño final de la imagen capturada
  var drawWidth = canvasWidth * scale;
  var drawHeight = canvasHeight * scale;
  var drawX = (videoElement.videoWidth - drawWidth) / 2;
  var drawY = (videoElement.videoHeight - drawHeight) / 2;

  // Asegurarse de que el canvas tenga el mismo tamaño que el video
  canvasElement.width = drawWidth;
  canvasElement.height = drawHeight;

  // Dibujar el video en el canvas con la escala adecuada
  canvasContext.drawImage(videoElement, drawX, drawY, drawWidth, drawHeight, 0, 0, canvasWidth, canvasHeight);

  // Obtener la imagen como un archivo base64 codificado en datos
  var imageDataURL = canvasElement.toDataURL('image/png');

  // Mostrar la vista previa de la imagen capturada
  var previewImageElement = document.getElementById('previewImage');
  previewImageElement.src = imageDataURL;
  
  // Asignar la imagen codificada al campo de entrada de archivo en el formulario
  var fileInput = document.getElementById('myFile');
  fileInput.value = imageDataURL;
});
