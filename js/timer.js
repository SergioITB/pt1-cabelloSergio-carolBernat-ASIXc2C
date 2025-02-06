document.addEventListener('DOMContentLoaded', () => {
    // Obtenim els elements del DOM
    const currentTimeElement = document.getElementById('current-time');
    const alarmTimeInput = document.getElementById('alarm-time');
    const countdownDurationInput = document.getElementById('countdown-duration');
    const soundSelect = document.getElementById('sound');
    const startAlarmButton = document.getElementById('start-alarm');
    const startCountdownButton = document.getElementById('start-countdown');
    const stopSoundButton = document.getElementById('stop-sound');
    const clearInputsButton = document.getElementById('clear-inputs');
    const countdownElement = document.getElementById('countdown');
    const container = document.querySelector('.container'); // Obtenim el contenidor principal
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const esBtn = document.getElementById('esBtn');
    const caBtn = document.getElementById('caBtn');
    const title = document.getElementById('title');
    const alarmTitle = document.getElementById('alarm-title');
    const countdownTitle = document.getElementById('countdown-title');
    const soundLabel = document.getElementById('sound-label');

    let alarmTimeout;
    let countdownInterval;
    let endTime;
    let currentSound;
    let alarmActive = false;
    let zoomLevel = 1;

    const texts = {
        es: {
            title: 'Reloj de Arena',
            alarmTitle: 'Alarma',
            countdownTitle: 'Cuenta Atrás',
            soundLabel: 'Selecciona el sonido:',
            startAlarmButton: 'Activar/Apagar',
            startCountdownButton: 'Iniciar',
            stopSoundButton: 'Parar el sonido',
            clearInputsButton: 'Limpiar'
        },
        ca: {
            title: 'Rellotge de Sorra',
            alarmTitle: 'Alarma',
            countdownTitle: 'Compte Enrere',
            soundLabel: 'Selecciona el so:',
            startAlarmButton: 'Activar/Apagar',
            startCountdownButton: 'Iniciar',
            stopSoundButton: 'Parar el so',
            clearInputsButton: 'Netejar'
        }
    };

    // Event listener para el botón de main
    mainBtn.addEventListener('click', function() {
    window.location.href = '../index.html'; // Redirige a index.html
    });

    // Actualitza l'hora actual cada segon
    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString();
    }

    // Inicia o atura l'alarma
    function startAlarm() {
        if (alarmActive) {
            clearTimeout(alarmTimeout);
            startAlarmButton.style.backgroundColor = '#0011ff';
            alarmActive = false;
        } else {
            const alarmTimeValue = alarmTimeInput.value;

            if (alarmTimeValue) {
                const [hours, minutes] = alarmTimeValue.split(':');
                const alarmTime = new Date();
                alarmTime.setHours(hours, minutes, 0, 0);

                const now = new Date();
                const timeToAlarm = alarmTime - now;

                if (timeToAlarm > 0) {
                    alarmTimeout = setTimeout(() => playSound(soundSelect.value), timeToAlarm);
                    startAlarmButton.style.backgroundColor = 'red';
                    alarmActive = true;
                } else {
                    alert('La hora de la alarma debe ser en el futur.');
                }
            } else {
                alert('Si us plau, estableix una hora per a l\'alarma.');
            }
        }
    }

    // Inicia el compte enrere
    function startCountdown() {
        clearInterval(countdownInterval);
        const now = new Date();
        const countdownDurationValue = countdownDurationInput.value;

        if (countdownDurationValue) {
            const timeParts = countdownDurationValue.split(':').map(Number);
            let totalSeconds;

            if (timeParts.length === 3) {
                const [hours, minutes, seconds] = timeParts;
                totalSeconds = hours * 3600 + minutes * 60 + seconds;
            } else if (timeParts.length === 2) {
                const [minutes, seconds] = timeParts;
                totalSeconds = minutes * 60 + seconds;
            } else {
                totalSeconds = timeParts[0];
            }

            endTime = new Date(now.getTime() + totalSeconds * 1000);
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            alert('Si us plau, estableix una duració per al compte enrere.');
        }
    }

    // Actualitza el compte enrere cada segon
    function updateCountdown() {
        const now = new Date();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '00:00:00';
            playSound(soundSelect.value);
        } else {
            const hours = String(Math.floor(remainingTime / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((remainingTime % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    // Reprodueix el so seleccionat
    function playSound(soundPath) {
        if (currentSound) {
            currentSound.pause();
        }
        currentSound = new Audio(soundPath);
        currentSound.play();
    }

    // Atura el so actual
    function stopSound() {
        if (currentSound) {
            currentSound.pause();
        }
    }

    // Neteja els inputs i atura les alarmes i comptes enrere
    function clearInputs() {
        alarmTimeInput.value = '';
        countdownDurationInput.value = '';
        startAlarmButton.style.backgroundColor = 'initial';
        alarmActive = false;
        clearTimeout(alarmTimeout);
        clearInterval(countdownInterval);
        countdownElement.textContent = '';
    }

    // Configura els esdeveniments
    setInterval(updateCurrentTime, 1000);
    startAlarmButton.addEventListener('click', startAlarm);
    startCountdownButton.addEventListener('click', startCountdown);
    stopSoundButton.addEventListener('click', stopSound);
    clearInputsButton.addEventListener('click', clearInputs);

    // Canvia el color de fons segons l'estat del toggle
    const toggle = document.getElementById('toggle');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.backgroundColor = '#c1f7f2';
            container.style.backgroundColor = '#6899b9'; // Canvia el color de fons del contenidor
        } else {
            document.body.style.backgroundColor = 'black';
            container.style.backgroundColor = '#111'; // Canvia el color de fons del contenidor
        }
    });

    // Funció per fer zoom in
    function zoomIn() {
        zoomLevel += 0.1;
        container.style.transform = `scale(${zoomLevel})`;
    }

    // Funció per fer zoom out
    function zoomOut() {
        if (zoomLevel > 0.1) {
            zoomLevel -= 0.1;
            container.style.transform = `scale(${zoomLevel})`;
        }
    }

    // Assigna els esdeveniments als botons de zoom
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);

    // Funció per canviar l'idioma a espanyol
    esBtn.addEventListener('click', () => {
        title.textContent = texts.es.title;
        alarmTitle.textContent = texts.es.alarmTitle;
        countdownTitle.textContent = texts.es.countdownTitle;
        soundLabel.textContent = texts.es.soundLabel;
        startAlarmButton.textContent = texts.es.startAlarmButton;
        startCountdownButton.textContent = texts.es.startCountdownButton;
        stopSoundButton.textContent = texts.es.stopSoundButton;
        clearInputsButton.textContent = texts.es.clearInputsButton;
    });

    // Funció per canviar l'idioma a català
    caBtn.addEventListener('click', () => {
        title.textContent = texts.ca.title;
        alarmTitle.textContent = texts.ca.alarmTitle;
        countdownTitle.textContent = texts.ca.countdownTitle;
        soundLabel.textContent = texts.ca.soundLabel;
        startAlarmButton.textContent = texts.ca.startAlarmButton;
        startCountdownButton.textContent = texts.ca.startCountdownButton;
        stopSoundButton.textContent = texts.ca.stopSoundButton;
        clearInputsButton.textContent = texts.ca.clearInputsButton;
    });
});