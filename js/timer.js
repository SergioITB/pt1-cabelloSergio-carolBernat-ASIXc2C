document.addEventListener('DOMContentLoaded', () => {
    // Obtenim els elements del DOM
    const currentTimeElement = document.getElementById('current-time'); // Element per mostrar l'hora actual
    const alarmTimeInput = document.getElementById('alarm-time'); // Input per establir l'hora de l'alarma
    const countdownDurationInput = document.getElementById('countdown-duration'); // Input per establir la duració del compte enrere
    const soundSelect = document.getElementById('sound'); // Selector per triar el so de l'alarma
    const startAlarmButton = document.getElementById('start-alarm'); // Botó per activar o desactivar l'alarma
    const startCountdownButton = document.getElementById('start-countdown'); // Botó per iniciar o aturar el compte enrere
    const stopSoundButton = document.getElementById('stop-sound'); // Botó per parar el so de l'alarma
    const clearInputsButton = document.getElementById('clear-inputs'); // Botó per netejar els inputs
    const countdownElement = document.getElementById('countdown'); // Element per mostrar el compte enrere
    const container = document.querySelector('.container'); // Contenidor principal
    const zoomInButton = document.getElementById('zoom-in'); // Botó per fer zoom in
    const zoomOutButton = document.getElementById('zoom-out'); // Botó per fer zoom out
    const esBtn = document.getElementById('esBtn'); // Botó per canviar l'idioma a espanyol
    const caBtn = document.getElementById('caBtn'); // Botó per canviar l'idioma a català
    const title = document.getElementById('title'); // Títol de la pàgina
    const alarmTitle = document.getElementById('alarm-title'); // Títol de la secció d'alarma
    const countdownTitle = document.getElementById('countdown-title'); // Títol de la secció de compte enrere
    const soundLabel = document.getElementById('sound-label'); // Etiqueta per al selector de so

    let alarmTimeout; // Variable per emmagatzemar el timeout de l'alarma
    let countdownInterval; // Variable per emmagatzemar l'interval del compte enrere
    let endTime; // Variable per emmagatzemar l'hora de finalització del compte enrere
    let currentSound; // Variable per emmagatzemar el so actual
    let alarmActive = false; // Variable per indicar si l'alarma està activa
    let countdownActive = false; // Variable per indicar si el compte enrere està actiu
    let zoomLevel = 1; // Variable per emmagatzemar el nivell de zoom

    // Textos per a diferents idiomes
    const texts = {
        es: {
            title: 'Reloj Digital',
            alarmTitle: 'Alarma',
            countdownTitle: 'Cuenta Atrás',
            soundLabel: 'Selecciona el sonido:',
            startAlarmButton: 'Activar/Apagar',
            startCountdownButton: 'Iniciar/Parar',
            stopSoundButton: 'Parar el sonido',
            clearInputsButton: 'Limpiar'
        },
        ca: {
            title: 'Rellotge Digital',
            alarmTitle: 'Alarma',
            countdownTitle: 'Compte Enrere',
            soundLabel: 'Selecciona el so:',
            startAlarmButton: 'Activar/Apagar',
            startCountdownButton: 'Iniciar/Parar',
            stopSoundButton: 'Parar el so',
            clearInputsButton: 'Netejar'
        }
    };

    // Event listener per al botó de main
    mainBtn.addEventListener('click', function() {
        window.location.href = '../index.html'; // Redirigeix a index.html
    });

    // Funció per actualitzar l'hora actual cada segon
    function updateCurrentTime() {
        const now = new Date(); // Obtenim l'hora actual
        currentTimeElement.textContent = now.toLocaleTimeString(); // Actualitzem el contingut de l'element amb l'hora actual
    }

    // Funció per iniciar o aturar l'alarma
    function startAlarm() {
        if (alarmActive) {
            clearTimeout(alarmTimeout); // Atura l'alarma si està activa
            startAlarmButton.style.backgroundColor = '#0011ff'; // Canvia el color del botó a blau
            alarmActive = false; // Marca l'alarma com inactiva
        } else {
            const alarmTimeValue = alarmTimeInput.value; // Obtenim el valor de l'input de l'alarma

            if (alarmTimeValue) {
                const [hours, minutes] = alarmTimeValue.split(':'); // Separem les hores i els minuts
                const alarmTime = new Date(); // Creem un nou objecte Date
                alarmTime.setHours(hours, minutes, 0, 0); // Establim l'hora de l'alarma

                const now = new Date(); // Obtenim l'hora actual
                const timeToAlarm = alarmTime - now; // Calculem el temps restant fins a l'alarma

                if (timeToAlarm > 0) {
                    alarmTimeout = setTimeout(() => playSound(soundSelect.value), timeToAlarm); // Establim un timeout per reproduir el so de l'alarma
                    startAlarmButton.style.backgroundColor = 'red'; // Canvia el color del botó a vermell
                    alarmActive = true; // Marca l'alarma com activa
                } else {
                    alert('La hora de la alarma debe ser en el futur.'); // Mostra un missatge d'error si l'hora de l'alarma és en el passat
                }
            } else {
                alert('Si us plau, estableix una hora per a l\'alarma.'); // Mostra un missatge d'error si no s'ha establert una hora per a l'alarma
            }
        }
    }

    // Funció per iniciar o aturar el compte enrere
    function startCountdown() {
        if (countdownActive) {
            clearInterval(countdownInterval); // Atura el compte enrere si està actiu
            startCountdownButton.style.backgroundColor = '#0011ff'; // Canvia el color del botó a blau
            countdownActive = false; // Marca el compte enrere com inactiu
        } else {
            clearInterval(countdownInterval); // Atura qualsevol compte enrere actiu
            const now = new Date(); // Obtenim l'hora actual
            const countdownDurationValue = countdownDurationInput.value; // Obtenim el valor de l'input de duració del compte enrere

            if (countdownDurationValue) {
                const timeParts = countdownDurationValue.split(':').map(Number); // Separem les parts de la duració i les convertim a nombres
                let totalSeconds;

                if (timeParts.length === 3) {
                    const [hours, minutes, seconds] = timeParts; // Separem les hores, minuts i segons
                    totalSeconds = hours * 3600 + minutes * 60 + seconds; // Calculem el total de segons
                } else if (timeParts.length === 2) {
                    const [minutes, seconds] = timeParts; // Separem els minuts i segons
                    totalSeconds = minutes * 60 + seconds; // Calculem el total de segons
                } else {
                    totalSeconds = timeParts[0]; // Si només hi ha una part, és el total de segons
                }

                endTime = new Date(now.getTime() + totalSeconds * 1000); // Calculem l'hora de finalització del compte enrere
                countdownInterval = setInterval(updateCountdown, 1000); // Establim un interval per actualitzar el compte enrere cada segon
                startCountdownButton.style.backgroundColor = 'red'; // Canvia el color del botó a vermell
                countdownActive = true; // Marca el compte enrere com actiu
            } else {
                alert('Si us plau, estableix una duració per al compte enrere.'); // Mostra un missatge d'error si no s'ha establert una duració per al compte enrere
            }
        }
    }

    // Funció per actualitzar el compte enrere cada segon
    function updateCountdown() {
        const now = new Date(); // Obtenim l'hora actual
        const remainingTime = endTime - now; // Calculem el temps restant fins a la finalització del compte enrere

        if (remainingTime <= 0) {
            clearInterval(countdownInterval); // Atura el compte enrere si ha arribat a zero
            countdownElement.textContent = '00:00:00'; // Mostra el compte enrere com a zero
            playSound(soundSelect.value); // Reprodueix el so seleccionat
            startCountdownButton.style.backgroundColor = '#0011ff'; // Restableix el color del botó a blau
            countdownActive = false; // Marca el compte enrere com inactiu
        } else {
            const hours = String(Math.floor(remainingTime / 3600000)).padStart(2, '0'); // Calculem les hores restants
            const minutes = String(Math.floor((remainingTime % 3600000) / 60000)).padStart(2, '0'); // Calculem els minuts restants
            const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0'); // Calculem els segons restants
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`; // Actualitzem el contingut de l'element amb el temps restant
        }
    }

    // Funció per reproduir el so seleccionat
    function playSound(soundPath) {
        if (currentSound) {
            currentSound.pause(); // Atura el so actual si n'hi ha un en reproducció
        }
        currentSound = new Audio(soundPath); // Crea un nou objecte Audio amb el camí del so seleccionat
        currentSound.play(); // Reprodueix el so
    }

    // Funció per aturar el so actual
    function stopSound() {
        if (currentSound) {
            currentSound.pause(); // Atura el so actual si n'hi ha un en reproducció
        }
    }

    // Funció per netejar els inputs i aturar les alarmes i comptes enrere
    function clearInputs() {
        alarmTimeInput.value = ''; // Neteja l'input de l'alarma
        countdownDurationInput.value = ''; // Neteja l'input del compte enrere
        startAlarmButton.style.backgroundColor = '#0011ff'; // Restableix el color del botó de l'alarma
        startCountdownButton.style.backgroundColor = '#0011ff'; // Restableix el color del botó del compte enrere
        alarmActive = false; // Marca l'alarma com inactiva
        countdownActive = false; // Marca el compte enrere com inactiu
        clearTimeout(alarmTimeout); // Atura el timeout de l'alarma
        clearInterval(countdownInterval); // Atura l'interval del compte enrere
        countdownElement.textContent = ''; // Neteja el contingut de l'element del compte enrere
    }

    // Configura els esdeveniments per actualitzar l'hora actual cada segon
    setInterval(updateCurrentTime, 1000);
    startAlarmButton.addEventListener('click', startAlarm); // Assigna l'esdeveniment de clic per iniciar o aturar l'alarma
    startCountdownButton.addEventListener('click', startCountdown); // Assigna l'esdeveniment de clic per iniciar o aturar el compte enrere
    stopSoundButton.addEventListener('click', stopSound); // Assigna l'esdeveniment de clic per aturar el so
    clearInputsButton.addEventListener('click', clearInputs); // Assigna l'esdeveniment de clic per netejar els inputs

    // Canvia el color de fons segons l'estat del toggle
    const toggle = document.getElementById('toggle');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.backgroundColor = '#c1f7f2'; // Canvia el color de fons del body a blau clar
            container.style.backgroundColor = '#6899b9'; // Canvia el color de fons del contenidor a blau
        } else {
            document.body.style.backgroundColor = 'black'; // Canvia el color de fons del body a negre
            container.style.backgroundColor = '#111'; // Canvia el color de fons del contenidor a gris fosc
        }
    });

    // Funció per fer zoom in
    function zoomIn() {
        zoomLevel += 0.1; // Incrementa el nivell de zoom
        container.style.transform = `scale(${zoomLevel})`; // Aplica la transformació de zoom al contenidor
    }

    // Funció per fer zoom out
    function zoomOut() {
        if (zoomLevel > 0.1) {
            zoomLevel -= 0.1; // Decrementa el nivell de zoom si és superior a 0.1
            container.style.transform = `scale(${zoomLevel})`; // Aplica la transformació de zoom al contenidor
        }
    }

    // Assigna els esdeveniments als botons de zoom
    zoomInButton.addEventListener('click', zoomIn); // Assigna l'esdeveniment de clic per fer zoom in
    zoomOutButton.addEventListener('click', zoomOut); // Assigna l'esdeveniment de clic per fer zoom out

    // Funció per canviar l'idioma a espanyol
    esBtn.addEventListener('click', () => {
        title.textContent = texts.es.title; // Canvia el títol a espanyol
        alarmTitle.textContent = texts.es.alarmTitle; // Canvia el títol de l'alarma a espanyol
        countdownTitle.textContent = texts.es.countdownTitle; // Canvia el títol del compte enrere a espanyol
        soundLabel.textContent = texts.es.soundLabel; // Canvia l'etiqueta del selector de so a espanyol
        startAlarmButton.textContent = texts.es.startAlarmButton; // Canvia el text del botó d'alarma a espanyol
        startCountdownButton.textContent = texts.es.startCountdownButton; // Canvia el text del botó de compte enrere a espanyol
        stopSoundButton.textContent = texts.es.stopSoundButton; // Canvia el text del botó de parar el so a espanyol
        clearInputsButton.textContent = texts.es.clearInputsButton; // Canvia el text del botó de netejar a espanyol
    });

    // Funció per canviar l'idioma a català
    caBtn.addEventListener('click', () => {
        title.textContent = texts.ca.title; // Canvia el títol a català
        alarmTitle.textContent = texts.ca.alarmTitle; // Canvia el títol de l'alarma a català
        countdownTitle.textContent = texts.ca.countdownTitle; // Canvia el títol del compte enrere a català
        soundLabel.textContent = texts.ca.soundLabel; // Canvia l'etiqueta del selector de so a català
        startAlarmButton.textContent = texts.ca.startAlarmButton; // Canvia el text del botó d'alarma a català
        startCountdownButton.textContent = texts.ca.startCountdownButton; // Canvia el text del botó de compte enrere a català
        stopSoundButton.textContent = texts.ca.stopSoundButton; // Canvia el text del botó de parar el so a català
        clearInputsButton.textContent = texts.ca.clearInputsButton; // Canvia el text del botó de netejar a català
    });
});