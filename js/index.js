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
};