document.getElementById('cargarArchivo').addEventListener('change', function(event) {
    const archivo = event.target.files[0];

    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = function(e) {
        const contenido = e.target.result;
        const nombres = contenido.split(';').map(nombre => nombre.trim()).filter(nombre => nombre !== '');

        // Enviar los nombres a `roulete.js` 
        if (typeof actualizarRuleta === 'function') {
            actualizarRuleta(nombres);
        } else {
            console.error('La función actualizarRuleta no está definida en roulete.js');
        }
    };

    lector.readAsText(archivo);
});
