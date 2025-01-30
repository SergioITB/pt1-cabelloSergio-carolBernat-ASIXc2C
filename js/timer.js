document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');
    const alarmTimeInput = document.getElementById('alarm-time');
    const countdownDurationInput = document.getElementById('countdown-duration');
    const soundSelect = document.getElementById('sound');
    const startAlarmButton = document.getElementById('start-alarm');
    const startCountdownButton = document.getElementById('start-countdown');
    const countdownElement = document.getElementById('countdown');

    let alarmTimeout;
    let countdownInterval;
    let endTime;

    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString();
    }

    function startAlarm() {
        clearTimeout(alarmTimeout);
        const alarmTimeValue = alarmTimeInput.value;

        if (alarmTimeValue) {
            const [hours, minutes] = alarmTimeValue.split(':');
            const alarmTime = new Date();
            alarmTime.setHours(hours, minutes, 0, 0);

            const now = new Date();
            const timeToAlarm = alarmTime - now;

            if (timeToAlarm > 0) {
                alarmTimeout = setTimeout(playSound, timeToAlarm);
            } else {
                alert('La hora de la alarma debe ser en el futuro.');
            }
        } else {
            alert('Por favor, establece una hora para la alarma.');
        }
    }

    function startCountdown() {
        clearInterval(countdownInterval);
        const now = new Date();
        const countdownDurationValue = countdownDurationInput.value;

        if (countdownDurationValue) {
            const [hours, minutes, seconds] = countdownDurationValue.split(':').map(Number);
            endTime = new Date(now.getTime() + (hours * 3600 + minutes * 60 + seconds) * 1000);
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
            playSound();
        } else {
            const hours = String(Math.floor(remainingTime / 3600000)).padStart(2, '0');
            const minutes = String(Math.floor((remainingTime % 3600000) / 60000)).padStart(2, '0');
            const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
            countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    function playSound() {
        const sound = new Audio(soundSelect.value);
        sound.play();
    }

    setInterval(updateCurrentTime, 1000);
    startAlarmButton.addEventListener('click', startAlarm);
    startCountdownButton.addEventListener('click', startCountdown);
});