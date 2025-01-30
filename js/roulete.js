// Obtener el contexto del canvas
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
const flecha = document.querySelector('.flecha');

let nombres = []; // Lista de nombres cargados
let numSecciones = 0;
let anguloPorSeccion = 0;

// Función para reproducir sonido asegurando que no sea bloqueado por el navegador
function reproducirSonido() {
    const winnerSound = new Audio('../effects/winner.mp3'); // Cargar el audio en el momento de ejecución
    winnerSound.volume = 1.0; // Asegurar que el volumen no esté en 0
    winnerSound.play().catch(error => console.error("Error al reproducir el audio:", error));
}

// Dibujar la ruleta
function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSecciones; i++) {
        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.arc(300, 300, 300, i * anguloPorSeccion, (i + 1) * anguloPorSeccion);
        
        // Color aleatorio para cada segmento
        ctx.fillStyle = `hsl(${i * (360 / numSecciones)}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();

        // Dibujar nombre en el segmento
        ctx.save();
        ctx.translate(300, 300);
        ctx.rotate(i * anguloPorSeccion + anguloPorSeccion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        // Letra en negrita
        ctx.font = "bold 23px Arial";
        ctx.fillText(nombres[i], 200, 10);
        ctx.restore();
    }
}

// Girar la ruleta
function girarRuleta() {
    if (numSecciones === 0) {
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
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(300, 300);
            ctx.rotate(anguloActual);
            ctx.translate(-300, -300);
            dibujarRuleta();
            ctx.restore();
            requestAnimationFrame(animar);
        } else {
            determinarGanador(anguloActual % (2 * Math.PI));
        }
    }
    animar();
}

// Determinar el ganador
function determinarGanador(anguloFinal) {
    const indiceGanador = Math.floor((numSecciones - (anguloFinal / anguloPorSeccion)) % numSecciones);
    
    // Lanzar confetti antes del popup
    lanzarConfetti();

    // Reproducir sonido después de 500ms del confetti
    setTimeout(() => {
        reproducirSonido(); // Llamar a la función segura de reproducción
    }, 500);

    // Esperar 1 segundo antes de mostrar el mensaje de ganador
    setTimeout(() => {
        alert(`El ganador es: ${nombres[indiceGanador]}`);
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

// Actualizar la ruleta con los nombres cargados desde `fileHandler.js`
function actualizarRuleta(nombresCargados) {
    nombres = nombresCargados;
    numSecciones = nombres.length;
    anguloPorSeccion = 2 * Math.PI / numSecciones;
    dibujarRuleta();
}

const toggle = document.getElementById('toggle');
toggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.style.backgroundColor = 'white';
    } else {
        document.body.style.backgroundColor = 'black';
    }
});

// Event listener para el botón de girar
girarBtn.addEventListener('click', girarRuleta);
