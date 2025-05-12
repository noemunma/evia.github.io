const contenedor = document.getElementById("juegoarcade2");
const pelota = document.getElementById("pelota");
const barra = document.getElementById("barra");


const musicaFondo = new Audio('/audio/arcade2.mp3');
const sonidoLadrillo = new Audio('/audio/ladrillo.mp3');
const sonidoBarra = new Audio('/audio/barra.mp3');
const sonidoDerrota = new Audio('/audio/final2.wav');
const sonidoVictoria = new Audio('/audio/winner4.mp3');

musicaFondo.loop = true;

let pelotaX = 240;
let pelotaY = 200;
let dx = 0.8;
let dy = -0.8;
let radio = 10;

let barraX = 177.5;
const barraWidth = 125;
const contenedorWidth = 480;

let rightPressed = false;
let leftPressed = false;
let bricks = [];
let filas = 3;
let columnas;
let puntuacion = 0;
let nivel = 1;
let animationId;

function crearLadrillos() {
  bricks.forEach(b => b.remove());
  bricks = [];

  const ladrilloWidth = 50;
  const espacioEntreLadrillos = 10;
  columnas = Math.floor(contenedorWidth / (ladrilloWidth + espacioEntreLadrillos));

  for (let c = 0; c < columnas; c++) {
    for (let f = 0; f < filas; f++) {
      const ladrillo = document.createElement("div");
      ladrillo.className = "ladrillo";
      ladrillo.style.left = `${c * (ladrilloWidth + espacioEntreLadrillos)}px`;
      ladrillo.style.top = `${f * 60}px`;
      contenedor.appendChild(ladrillo);
      bricks.push(ladrillo);
    }
  }
}

function moverPelota() {
  pelotaX += dx;
  pelotaY += dy;

  if (pelotaX + radio > contenedorWidth || pelotaX - radio < 0) dx = -dx;
  if (pelotaY - radio < 0) dy = -dy;

  if (pelotaY + radio > 460) {
    if (pelotaX > barraX && pelotaX < barraX + barraWidth) {
      dy = -dy;
      sonidoBarra.currentTime = 0;
      sonidoBarra.play();
    } else {
      cancelAnimationFrame(animationId);
      document.getElementById("puntos-finales").textContent = puntuacion;
      mostrarPantalla("fin");
      musicaFondo.pause();
      musicaFondo.currentTime = 0;
      sonidoDerrota.play();
      return;
    }
  }

  bricks.forEach((b, i) => {
    const rect = b.getBoundingClientRect();
    const juegoRect = contenedor.getBoundingClientRect();
    const bx = rect.left - juegoRect.left;
    const by = rect.top - juegoRect.top;
    if (
      pelotaX > bx && pelotaX < bx + 50 &&
      pelotaY > by && pelotaY < by + 50
    ) {
      dy = -dy;
      b.remove();
      bricks.splice(i, 1);
      puntuacion += 10;

      document.getElementById("puntos").textContent = puntuacion;
      sonidoLadrillo.currentTime = 0;
      sonidoLadrillo.play();
      if (bricks.length === 0) {
        cancelAnimationFrame(animationId);
        document.getElementById("nivel").textContent = nivel;
        mostrarPantalla("nivel-superado");
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
        sonidoVictoria.play();
      }
    }
  });

  pelota.style.left = `${pelotaX - radio}px`;
  pelota.style.top = `${pelotaY - radio}px`;
}

function moverBarra() {
  if (rightPressed && barraX < contenedorWidth - barraWidth) barraX += 5;
  else if (leftPressed && barraX > 0) barraX -= 5;
  barra.style.left = `${barraX}px`;
}

function mover(direccionX, _) {
  barraX += direccionX * 20;
  if (barraX < 0) barraX = 0;
  if (barraX > contenedorWidth - barraWidth) barraX = contenedorWidth - barraWidth;
  barra.style.left = `${barraX}px`;
}

function loop() {
  moverPelota();
  moverBarra();
  animationId = requestAnimationFrame(loop);
}

function iniciarJuego() {
  musicaFondo.currentTime = 0;
  musicaFondo.play();
  puntuacion = 0;
  nivel = 1;
  document.getElementById("puntos").textContent = puntuacion;
  document.getElementById("nivel").textContent = nivel;
  crearLadrillos();
  iniciarNivel();
}

function iniciarNivel() {
  pelotaX = 240;
  pelotaY = 200;
  dx = 1 + nivel * 0.3;
  dy = -1 - nivel * 0.3;
  barraX = (contenedorWidth - barraWidth) / 2;
  mostrarPantalla("pantalla-juego");
  loop();
}

function continuarJuego() {
  nivel++;
  document.getElementById("nivel").textContent = nivel;
  crearLadrillos();
  iniciarNivel();
  musicaFondo.play();
}

function reiniciarJuego() {
  iniciarJuego();
}

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("visible"));
  document.getElementById(id).classList.add("visible");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightPressed = true;
  else if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") rightPressed = false;
  else if (e.key === "ArrowLeft") leftPressed = false;
});