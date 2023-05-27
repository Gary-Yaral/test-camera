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

  // Establecer el tamaño del canvas al mismo que el video
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  // Dibujar el video en el canvas
  canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

  // Obtener la imagen como un archivo base64 codificado en datos
  var imageDataURL = canvasElement.toDataURL('image/png');


  // Asignar la imagen codificada al campo de entrada de archivo en el formulario
  /* var fileInput = document.getElementById('myFile');
  fileInput.value = imageDataURL; */
});

