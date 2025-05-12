const grid = document.getElementById('grid');
let cards = [];
let flipped = [];
let matchedCount = 0;
let puntos = 0;

// Sonidos
const sonidoFondo = new Audio('/audio/logica2.mp3');
const sonidoAcierto = new Audio('/audio/winner.wav');
const sonidoFallo = new Audio('/audio/error.mp3');
const sonidoPantalla = new Audio('/audio/winner4.mp3');

// Reproducción en bucle para música de fondo
sonidoFondo.loop = true;

function iniciarJuego() {
  sonidoFondo.play();
  puntos = 0;
  actualizarPuntuacion();
  mostrarPantalla('pantalla-juego');
  generarCartas();
}

function siguienteNivel() {
  sonidoPantalla.play();
  iniciarJuego();
}

function reiniciarJuego() {
  sonidoPantalla.play();
  iniciarJuego();
}

function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');
}

function generarCartas() {
  grid.innerHTML = '';

  const totalPares = 8;
  const indicesDisponibles = Array.from({ length: 20 }, (_, i) => i + 1);
  const seleccionadas = [];

  for (let i = 0; i < totalPares; i++) {
    const idx = Math.floor(Math.random() * indicesDisponibles.length);
    seleccionadas.push(indicesDisponibles.splice(idx, 1)[0]);
  }

  const pares = [...seleccionadas, ...seleccionadas];
  cards = pares.sort(() => 0.5 - Math.random());
  matchedCount = 0;
  flipped = [];

  cards.forEach((numero, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.valor = numero;
    div.dataset.index = index;
    div.onclick = () => voltearCarta(div);

    const img = document.createElement('img');
    img.src = '/imagenes/cartas/reverso.png';
    img.alt = 'Carta';
    img.className = 'card-img';
    div.appendChild(img);

    grid.appendChild(div);
  });
}

function voltearCarta(carta) {
  if (flipped.length === 2 || carta.classList.contains('matched') || carta.classList.contains('flipped')) return;

  const img = carta.querySelector('img');
  img.src = `/imagenes/cartas/${carta.dataset.valor}.png`;
  carta.classList.add('flipped');
  flipped.push(carta);

  if (flipped.length === 2) {
    const [a, b] = flipped;
    if (a.dataset.valor === b.dataset.valor) {
      sonidoAcierto.play();
      a.classList.add('matched');
      b.classList.add('matched');
      matchedCount++;
      puntos += 100;
      actualizarPuntuacion();
      flipped = [];

      if (matchedCount === 8) {
        setTimeout(() => {
          sonidoPantalla.play();
          mostrarPantalla('nivel-superado');
        }, 800);
      }
    } else {
      sonidoFallo.play();
      setTimeout(() => {
        a.querySelector('img').src = '/imagenes/cartas/reverso.png';
        b.querySelector('img').src = '/imagenes/cartas/reverso.png';
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flipped = [];
      }, 1000);
    }
  }
}

function actualizarPuntuacion() {
  const marcador = document.getElementById('puntos');
  if (marcador) marcador.textContent = `Puntos: ${puntos}`;
}
