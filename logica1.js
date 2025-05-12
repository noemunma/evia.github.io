const laberintoContainer = document.getElementById("laberinto");
const tamaño = 10;
const sonidoFondo = new Audio("audio/logica1.mp3");
const sonidoChoque = new Audio("audio/final3.wav");
const sonidoVictoria = new Audio("audio/winner4.wav");

sonidoFondo.loop = true; // para que la música no pare

let jugador = { x: 0, y: 0 };
let objetivo = { x: 9, y: 9 };
let obstaculos = [];

function generarLaberinto() {
  laberintoContainer.innerHTML = "";
  for (let y = 0; y < tamaño; y++) {
    for (let x = 0; x < tamaño; x++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      celda.dataset.x = x;
      celda.dataset.y = y;

      if (x === jugador.x && y === jugador.y) {
        celda.classList.add("medicamento");
      } else if (x === objetivo.x && y === objetivo.y) {
        celda.classList.add("objetivo");
      } else if (obstaculos.some(o => o.x === x && o.y === y)) {
        celda.classList.add("obstaculo");
      } else {
        celda.classList.add("camino");
      }

      laberintoContainer.appendChild(celda);
    }
  }
}

function mover(dx, dy) {
  const nuevoX = jugador.x + dx;
  const nuevoY = jugador.y + dy;
  if (nuevoX < 0 || nuevoY < 0 || nuevoX >= tamaño || nuevoY >= tamaño) return;

  if (obstaculos.some(o => o.x === nuevoX && o.y === nuevoY)) {
    sonidoChoque.play(); // 🔊 Obstáculo
    mostrarPantalla("fin");
    return;
  }

  jugador.x = nuevoX;
  jugador.y = nuevoY;

  if (jugador.x === objetivo.x && jugador.y === objetivo.y) {
    sonidoVictoria.play(); // 🔊 Meta
    mostrarPantalla("nivel-superado");
    return;
  }

  generarLaberinto();
}


document.addEventListener("keydown", e => {
  if (document.getElementById("pantalla-juego").classList.contains("visible")) {
    if (e.key === "ArrowUp") mover(0, -1);
    if (e.key === "ArrowDown") mover(0, 1);
    if (e.key === "ArrowLeft") mover(-1, 0);
    if (e.key === "ArrowRight") mover(1, 0);
  }
});

function iniciarJuego() {
  sonidoFondo.play(); // Música de fondo
  jugador = { x: 0, y: 0 };
  objetivo = { x: 9, y: 9 };
  obstaculos = generarObstaculos();
  generarLaberinto();
  mostrarPantalla("pantalla-juego");
}


function continuarJuego() {
  siguienteNivel();
}

function siguienteNivel() {
  jugador = { x: 0, y: 0 };
  objetivo = { x: 9, y: 9 };
  obstaculos = generarObstaculos();
  generarLaberinto();
  mostrarPantalla("pantalla-juego");
}

function reiniciarJuego() {
  iniciarJuego();
}

function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('visible'));
  document.getElementById(id).classList.add('visible');

  if (id === 'fin') sonidoFondo.pause(); //  Detener fondo si pierde
}


function generarObstaculos() {
  const obs = [];
  while (obs.length < 15) {
    let x = Math.floor(Math.random() * tamaño);
    let y = Math.floor(Math.random() * tamaño);
    if ((x !== 0 || y !== 0) && (x !== 9 || y !== 9) && !obs.some(o => o.x === x && o.y === y)) {
      obs.push({ x, y });
    }
  }
  return obs;
}
