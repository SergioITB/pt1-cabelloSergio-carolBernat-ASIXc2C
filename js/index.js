window.onload = function() {
    alert('Bienvenido a Nuestro Site');

    const toggle = document.getElementById('toggle');
    toggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.style.backgroundColor = 'white';
        } else {
            document.body.style.backgroundColor = 'black';
        }
    });

    const esBtn = document.getElementById('esBtn');
    const caBtn = document.getElementById('caBtn');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const welcomeText = document.getElementById('welcome-text');
    const rouleteText = document.getElementById('roulete-text');
    const timerText = document.getElementById('timer-text');

    const texts = {
        es: {
            title: 'Site Sergio y Bernat',
            subtitle: 'Toma tu elección',
            welcomeText: 'Bienvenido a nuestro sitio web. Aquí puedes elegir entre dos opciones interesantes:',
            rouleteText: '<strong>Roulete:</strong> Un juego emocionante para probar tu suerte.',
            timerText: '<strong>Timer:</strong> Una herramienta útil para gestionar tu tiempo.'
        },
        ca: {
            title: 'Lloc Sergio i Bernat',
            subtitle: 'Fes la teva elecció',
            welcomeText: 'Benvingut al nostre lloc web. Aquí pots triar entre dues opcions interessants:',
            rouleteText: '<strong>Roulete:</strong> Un joc emocionant per provar la teva sort.',
            timerText: '<strong>Timer:</strong> Una eina útil per gestionar el teu temps.'
        }
    };

    esBtn.addEventListener('click', () => {
        title.textContent = texts.es.title;
        subtitle.textContent = texts.es.subtitle;
        welcomeText.textContent = texts.es.welcomeText;
        rouleteText.innerHTML = texts.es.rouleteText;
        timerText.innerHTML = texts.es.timerText;
    });

    caBtn.addEventListener('click', () => {
        title.textContent = texts.ca.title;
        subtitle.textContent = texts.ca.subtitle;
        welcomeText.textContent = texts.ca.welcomeText;
        rouleteText.innerHTML = texts.ca.rouleteText;
        timerText.innerHTML = texts.ca.timerText;
    });
};