// Obtener el contexto del canvas
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
const flecha = document.querySelector('.flecha');

let nombres = []; // Lista de nombres cargados
let numSecciones = 0;
let anguloPorSeccion = 0;

// Dibujar la ruleta
function dibujarRuleta() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSecciones; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * anguloPorSeccion, (i + 1) * anguloPorSeccion);
        
        // Color aleatorio para cada segmento
        ctx.fillStyle = `hsl(${i * (360 / numSecciones)}, 100%, 50%)`;
        ctx.fill();
        ctx.stroke();

        // Dibujar nombre en el segmento
        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(i * anguloPorSeccion + anguloPorSeccion / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "16px Arial";
        ctx.fillText(nombres[i], 130, 10);
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
            ctx.translate(150, 150);
            ctx.rotate(anguloActual);
            ctx.translate(-150, -150);
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

    // Esperar 1 segundo antes de mostrar el mensaje de ganador
    setTimeout(() => {
        alert(`El ganador es: ${nombres[indiceGanador]}`);
    }, 1000);
}

// Función para lanzar confetti
function lanzarConfetti() {
    confetti({
        particleCount: 150,
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

// Event listener para el botón de girar
girarBtn.addEventListener('click', girarRuleta);
