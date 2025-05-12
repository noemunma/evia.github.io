let puntos = 0;
let vidas = 3;
let nivel = 1;
let velocidad = 1500;
let intervalo;

// Sonidos
const musicaFondo = new Audio('/audio/arcade1.mp3');
musicaFondo.loop = true;

const sonidoNivel = new Audio('/audio/winner4.wav');
const sonidoPerder = new Audio('/audio/final2.wav');
const sonidoAplastar = new Audio('/audio/aplasta.wav');

function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
}

function iniciarJuego() {
  puntos = 0;
  vidas = 5;
  nivel = 1;
  velocidad = 1500;
  actualizarUI();
  mostrarPantalla('pantalla-juego');
  empezarNivel();
  musicaFondo.play();
}

function continuarJuego() {
  nivel++;
  velocidad = Math.max(400, velocidad - 200);
  actualizarUI();
  mostrarPantalla('pantalla-juego');
  empezarNivel();
  sonidoNivel.play();
}

function empezarNivel() {
  clearInterval(intervalo);
  intervalo = setInterval(crearCelula, velocidad);
}

function crearCelula() {
  const celula = document.createElement('div');
  celula.className = 'celula';
  celula.style.top = Math.random() * 440 + 'px';
  celula.style.left = Math.random() * 440 + 'px';
  celula.onclick = () => {
    puntos++;
    sonidoAplastar.play();
    celula.remove();
    if (puntos % 10 === 0) {
      clearInterval(intervalo);
      mostrarPantalla('nivel-superado');
    }
    actualizarUI();
  };
  document.getElementById('juego').appendChild(celula);
  setTimeout(() => {
    if (document.body.contains(celula)) {
      celula.remove();
      perderVida();
    }
  }, velocidad - 200);
}

function perderVida() {
  vidas--;
  actualizarUI();
  if (vidas <= 0) {
    clearInterval(intervalo);
    document.getElementById('puntos-finales').textContent = puntos;
    mostrarPantalla('fin');
    musicaFondo.pause();
    musicaFondo.currentTime = 0;
    sonidoPerder.play();
  }
}

function reiniciarJuego() {
  iniciarJuego();
}

function actualizarUI() {
  document.getElementById('puntos').textContent = puntos;
  document.getElementById('vidas').textContent = vidas;
  document.getElementById('nivel').textContent = nivel;
}
