const mensajes = ["Inspira", "Sostén", "Espira"];
const tiempos = [4000, 2000, 4000]; // milisegundos: 4s, 2s, 4s
let indice = 0;

function cambiarMensaje() {
  const msg = document.getElementById("message");
  msg.textContent = mensajes[indice];
  setTimeout(() => {
    indice = (indice + 1) % mensajes.length;
    cambiarMensaje();
  }, tiempos[indice]);
}

function volverAtras() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "entretenimiento.html";
  }
}

// Inicia los mensajes después de 1 segundo
setTimeout(cambiarMensaje, 1000);


