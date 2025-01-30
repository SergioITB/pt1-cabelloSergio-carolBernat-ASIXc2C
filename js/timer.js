document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const alarmTimeInput = document.getElementById('alarm-time');
    const countdownDurationInput = document.getElementById('countdown-duration');
    const soundSelect = document.getElementById('sound');
    const startAlarmButton = document.getElementById('start-alarm');
    const startCountdownButton = document.getElementById('start-countdown');
    const stopSoundButton = document.getElementById('stop-sound');
    const clearInputsButton = document.getElementById('clear-inputs');
    const countdownElement = document.getElementById('countdown');

    let alarmTimeout;
    let countdownInterval;
    let endTime;
    let currentSound;
    let alarmActive = false;

    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString();
    }

    function startAlarm() {
        if (alarmActive) {
            clearTimeout(alarmTimeout);
            startAlarmButton.style.backgroundColor = 'initial';
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
                    alert('La hora de la alarma debe ser en el futuro.');
                }
            } else {
                alert('Por favor, establece una hora para la alarma.');
            }
        }
    }

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
            alert('Por favor, establece una duración para el cuenta atrás.');
        }
    }

    function updateCountdown() {
        const now = new Date();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '00:00:00';
            playSound('../effects/cuentaAtras.mp3');
        } else {
            const hours = String(Math.floor(remainingTime / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((remainingTime % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    function playSound(soundPath) {
        if (currentSound) {
            currentSound.pause();
        }
        currentSound = new Audio(soundPath);
        currentSound.play();
    }

    function stopSound() {
        if (currentSound) {
            currentSound.pause();
        }
    }

    function clearInputs() {
        alarmTimeInput.value = '';
        countdownDurationInput.value = '';
        startAlarmButton.style.backgroundColor = 'initial';
        alarmActive = false;
        clearTimeout(alarmTimeout);
        clearInterval(countdownInterval);
        countdownElement.textContent = '';
    }

    setInterval(updateCurrentTime, 1000);
    startAlarmButton.addEventListener('click', startAlarm);
    startCountdownButton.addEventListener('click', startCountdown);
    stopSoundButton.addEventListener('click', stopSound);
    clearInputsButton.addEventListener('click', clearInputs);
});