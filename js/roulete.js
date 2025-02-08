// Obtener el contexto del canvas
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
const flecha = document.querySelector('.flecha');
const listaGanadores = document.getElementById('lista-ganadores'); // 🔹 Elemento para mostrar los ganadores
const resetBtn = document.getElementById('reset'); // Obtener el botón de reset

let nombres = []; // Lista de nombres cargados
let numSecciones = 0;
let anguloPorSeccion = 0;
let archivoCargado = false; // Indica si se ha cargado un archivo de nombres

// Función para inicializar la ruleta con segmentos predeterminados
function inicializarRuleta(N = 6) {
    nombres = Array.from({ length: N }, (_, i) => `#${i + 1}`);
    numSecciones = N;
    anguloPorSeccion = 2 * Math.PI / numSecciones;
    dibujarRuleta();
}

// Dibujar la ruleta
function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSecciones; i++) {
        ctx.save(); // Guardar el estado del contexto
        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.arc(300, 300, 300, i * anguloPorSeccion, (i + 1) * anguloPorSeccion);
        
        // Color aleatorio para cada segmento
        ctx.fillStyle = `hsl(${i * (360 / numSecciones)}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();

        // Dibujar nombre en el segmento
        ctx.translate(300, 300);
        ctx.rotate(i * anguloPorSeccion + anguloPorSeccion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "bold 23px Arial";
        
        let texto = nombres[i];
        ctx.fillText(texto, 200, 10);

        ctx.restore(); // Restaurar el estado del contexto
    }
}

// Girar la ruleta
function girarRuleta() {
    if (!archivoCargado) { // Bloquear giro si no se ha cargado un archivo
        alert("Por favor, carga un archivo con nombres antes de girar.");
        return;
    }

    const anguloGiro = Math.random() * 2 * Math.PI + 10 * 2 * Math.PI; // Girar al menos 10 vueltas
    let anguloActual = 0;
    const duracion = 5000; // Duración del giro en milisegundos
    const inicio = Date.now();

    function animar() {
        const tiempoTranscurrido = Date.now() - inicio;
        if (tiempoTranscurrido < duracion) {
            const t = tiempoTranscurrido / duracion;
            anguloActual = anguloGiro * (t * (2 - t)); // Ease-out effect
            ctx.save(); // Guardar el estado del contexto
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(300, 300);
            ctx.rotate(anguloActual);
            ctx.translate(-300, -300);
            dibujarRuleta();
            ctx.restore(); // Restaurar el estado del contexto
            requestAnimationFrame(animar);
        } else {
            determinarGanador(anguloActual % (2 * Math.PI));
        }
    }
    animar();
    
}
function reproducirSonido() {
    const audio = new Audio('../effects/winner.mp3');
    audio.play().catch(err => {
        console.error('Error al reproducir el sonido:', err);
    });
}

// Determinar el ganador
function determinarGanador(anguloFinal) {
    const indiceGanador = Math.floor((numSecciones - (anguloFinal / anguloPorSeccion)) % numSecciones);
    const nombreGanador = nombres[indiceGanador];
    
    // Lanzar confetti antes del popup
    lanzarConfetti();

    // Reproducir sonido después de 500ms del confetti
    setTimeout(() => {
        reproducirSonido(); // Llamar a la función segura de reproducción
    }, 50);

    // Esperar 1 segundo antes de mostrar el mensaje de ganador
    setTimeout(() => {
        alert(`El ganador es: ${nombreGanador}`);
        actualizarRegistroGanadores(nombreGanador); // 🔹 Agregar ganador a la lista
    }, 1000);
}

// Función para lanzar confetti
function lanzarConfetti() {
    confetti({
        particleCount: 300,
        spread: 100,
        origin: { y: 0.6 }
    });
}

// 🔹 Función para actualizar la lista de ganadores
function actualizarRegistroGanadores(nombreGanador) {
    const nuevoItem = document.createElement('tr');
    const nuevaCelda = document.createElement('td');
    nuevaCelda.textContent = nombreGanador;
    nuevoItem.appendChild(nuevaCelda);
    listaGanadores.appendChild(nuevoItem);
}

// Actualizar la ruleta con los nombres cargados desde `fileHandler.js`
function actualizarRuleta(nombresCargados) {
    nombres = nombresCargados;
    numSecciones = nombres.length;
    anguloPorSeccion = 2 * Math.PI / numSecciones;
    archivoCargado = true; // Habilita el giro al cargar un archivo
    dibujarRuleta();
}

const toggle = document.getElementById('toggle');
toggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = '#c1f7f2';
        flecha.classList.remove('blanca');
        flecha.classList.add('negra');
    } else {
        document.body.style.backgroundColor = 'black';
        flecha.classList.remove('negra');
        flecha.classList.add('blanca');
    }
});

// Event listener para el botón de girar
girarBtn.addEventListener('click', girarRuleta);

// Inicializa la ruleta con 6 segmentos predeterminados
inicializarRuleta(6);

// Función para recargar la página
function reset() {
    location.reload(); // Recarga la página
}

// Event listener para el botón de reset
resetBtn.addEventListener('click', reset);

// Event listener para el botón de main
mainBtn.addEventListener('click', function() {
    window.location.href = '../index.html'; // Redirige a index.html
});