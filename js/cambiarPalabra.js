// Array de palabras que queremos rotar
const palabras = ["Salud", "Bienestar", "Rendimiento"];
let index = 0; // Índice para seguir la palabra actual

// Selecciona el span que contiene la palabra que cambiará
const changingWordElement = document.querySelector('.changing-word');

// Función para cambiar la palabra
function cambiarPalabra() {
    index = (index + 1) % palabras.length; // Incrementa el índice y vuelve a 0 al final
    changingWordElement.textContent = palabras[index]; // Cambia el contenido del span
}

// Cambia la palabra cada 2 segundos (2000 milisegundos)
setInterval(cambiarPalabra, 2000);
