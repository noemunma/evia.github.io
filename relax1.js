const fondos = [
  'imagenes/relax/relax1.jpg',
  'imagenes/relax/relax2.jpg',
  'imagenes/relax/relax3.jpg',
  'imagenes/relax/relax4.jpg',
  'imagenes/relax/relax5.jpg',
  'imagenes/relax/relax6.jpg',
  'imagenes/relax/relax7.jpg',
  'imagenes/relax/relax8.jpg',
];

const canciones = [
  "audio/zen1.mp3",
  "audio/zen2.mp3",
  "audio/logica2.mp3",
];

let fondoIndex = 0;
let cancionIndex = 0;
let audioActual = null;

function cambiarFondo() {
  fondoIndex = (fondoIndex + 1) % fondos.length;
  document.body.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
}

function cambiarCancion() {
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }

  cancionIndex = (cancionIndex + 1) % canciones.length;
  audioActual = new Audio(canciones[cancionIndex]);
  audioActual.play();
  actualizarTextoBotonMusica();
}

function toggleMusica() {
  const boton = document.getElementById("btnMusica");
  if (audioActual) {
    if (audioActual.paused) {
      audioActual.play();
    } else {
      audioActual.pause();
    }
  } else {
    audioActual = new Audio(canciones[cancionIndex]);
    audioActual.play();
  }
  actualizarTextoBotonMusica();
}

function actualizarTextoBotonMusica() {
  const boton = document.getElementById("btnMusica");
  if (audioActual && !audioActual.paused) {
    boton.textContent = "Pausar Música";
  } else {
    boton.textContent = "Reproducir Música";
  }
}

function volverAtras() {
  if (window.history.length > 1) {
    history.back();
  } else {
    window.location.href = "entretenimiento.html"; 
  }
}

// Cargar un fondo inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.backgroundImage = `url('${fondos[fondoIndex]}')`;
  actualizarTextoBotonMusica();
});
