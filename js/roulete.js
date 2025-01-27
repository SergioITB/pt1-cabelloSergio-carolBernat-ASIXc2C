// Obtener el contexto del canvas
const canvas = document.getElementById('ruleta');
const ctx = canvas.getContext('2d');
const girarBtn = document.getElementById('girar');
const flecha = document.querySelector('.flecha');

// Definir los colores y secciones de la ruleta
const colores = ['blue', 'red', 'yellow', 'purple', 'grey', 'pink', 'orange', 'green']; 
const numSecciones = colores.length;
const anguloPorSeccion = 2 * Math.PI / numSecciones;

// Dibujar la ruleta
function dibujarRuleta() {
    for (let i = 0; i < numSecciones; i++) {
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * anguloPorSeccion, (i + 1) * anguloPorSeccion);
        ctx.fillStyle = colores[i];
        ctx.fill();
        ctx.stroke();
    }
}   

// Girar la ruleta
function girarRuleta() {
    const anguloGiro = Math.random() * 2 * Math.PI + 10 * 2 * Math.PI; // Girar al menos 10 vueltas
    let anguloActual = 0;
    const duracion = 5000; // Duración del giro en milisegundos
    const inicio = Date.now();

    function animar() {
        const tiempoTranscurrido = Date.now() - inicio;
        if (tiempoTranscurrido < duracion) {
            anguloActual = anguloGiro * (tiempoTranscurrido / duracion);
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
    alert(`El ganador es la sección de color: ${colores[indiceGanador]}`);
}

// Event listener para el botón de girar
girarBtn.addEventListener('click', girarRuleta);

// Dibujar la ruleta inicialmente
dibujarRuleta();