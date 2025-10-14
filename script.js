// ---------- script.js ----------

// Configuración
const EVENT_DATE = new Date('2025-11-15T12:00:00');
//const WHATSAPP_NUMBER = '5493863415863';
//const WHATSAPP_MESSAGE = encodeURIComponent(
  //'Hola! Muchas gracias por la invitación, confirmo mi asistencia a los XV de Lucía.\nNombre: \nCantidad de personas: \nNos vemos ese gran dia!'
//);

// ---------- Música ----------
const musica = document.getElementById('musica');
musica.pause(); // empieza pausada
function toggleMusic() {
  if (musica.paused) musica.play();
  else musica.pause();
}

// ---------- PUZZLE ----------
const pieces = document.querySelectorAll('.puzzle-piece');
const slots = document.querySelectorAll('.puzzle-slot');
let placedPieces = 0;

// Sonido por pieza colocada
const sonidoPieza = new Audio('pieza.mp3');

pieces.forEach(piece => { piece.addEventListener('dragstart', dragStart); });
slots.forEach(slot => { 
  slot.addEventListener('dragover', dragOver); 
  slot.addEventListener('drop', dropPiece); 
});

function dragStart(e) { e.dataTransfer.setData('text/plain', e.target.dataset.piece); }
function dragOver(e) { e.preventDefault(); }

function dropPiece(e) {
  e.preventDefault();
  const pieceId = e.dataTransfer.getData('text/plain');
  const pieceEl = document.querySelector(`.puzzle-piece[data-piece='${pieceId}']`);
  const slotId = e.currentTarget.dataset.slot;

  if (pieceId === slotId) {
    pieceEl.style.position = 'relative';
    pieceEl.style.width = '140px';
    pieceEl.style.height = '140px';
    pieceEl.style.top = '0';
    pieceEl.style.left = '0';
    pieceEl.style.cursor = 'default';
    pieceEl.classList.add('placed');

    e.currentTarget.appendChild(pieceEl);
    pieceEl.setAttribute('draggable', 'false');

    // Sonido al colocar pieza
    sonidoPieza.currentTime = 0;
    sonidoPieza.play();

    placedPieces++;

    if (placedPieces === 4) {
      // Sonido de completado
      const sonidoFinal = new Audio('puzzle-completado.mp3');
      sonidoFinal.play();

      // Mostrar invitación
      document.getElementById('page-puzzle').classList.add('hidden');
      document.getElementById('page-invitacion').classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reproducir música de fondo
      musica.play();
    }
  } else {
    pieceEl.classList.add('shake');
    setTimeout(() => pieceEl.classList.remove('shake'), 500);
  }
}

// ---------- WhatsApp ----------
document.getElementById('btn-wapp').addEventListener('click', () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  window.open(url, '_blank');
});

// ---------- Modal datos bancarios ----------
const modal = document.getElementById('modal-banco');
const btnRegalo = document.getElementById('btn-regalo');
const cerrarModal = document.getElementById('cerrar-modal');
const modalBackdrop = document.getElementById('modal-backdrop');

// Mostrar modal al hacer clic
btnRegalo.addEventListener('click', () => {
  modal.classList.remove('hidden');
  modal.classList.add('show');
  modalBackdrop.classList.add('show');
});

// Cerrar modal al hacer clic en el botón
cerrarModal.addEventListener('click', () => {
  modal.classList.remove('show');
  modalBackdrop.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 400); // esperar animación
});

// Cerrar modal al hacer clic fuera de él
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) {
    modal.classList.remove('show');
    modalBackdrop.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 400);
  }
});

// ---------- Contador regresivo ----------
function updateCountdown() {
  const now = new Date();
  const diff = EVENT_DATE - now;

  if (diff <= 0) {
    document.getElementById('countdown').textContent = '¡Hoy es el día!';
    return;
  }

  const dias = Math.floor(diff / (1000*60*60*24));
  const horas = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const minutos = Math.floor((diff % (1000*60*60)) / (1000*60));
  const segundos = Math.floor((diff % (1000*60)) / 1000);

  document.getElementById('countdown').textContent = 
    `${dias} días ${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Imágenes fallback ----------
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    img.style.opacity = 0.6;
    img.style.filter = 'grayscale(40%)';
  });
});
// --------- Efecto de escritura automática ---------
const texto = `Hoy, los recuerdos más bellos se hacen presentes en mi memoria, 
vienen a hacer que voltee a ver todo aquello tan maravilloso que me ha tocado vivir, 
las risas, mis travesuras, mis ocurrencias, el amor infaltable de mi familia 
y porqué no, las lágrimas que en ocasiones me tocó derramar. 
De todo ello aprendí mucho y hoy me hacen ser quien soy, alguien que sueña, vive y ama cada pasaje de su historia, 
y que agradece el poder caminar de la mano de los que aman verme feliz.

🌹✨LUCIA🌹✨`;

const textoElemento = document.getElementById('texto-escribir');
let index = 0;

function escribirTexto() {
  if(index < texto.length) {
    textoElemento.innerHTML += texto.charAt(index);
    index++;
    setTimeout(escribirTexto, 60); // 25ms entre letra y letra (puedes ajustar)
  }
}

document.addEventListener('DOMContentLoaded', escribirTexto);

