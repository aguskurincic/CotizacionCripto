const cotizador = new API('ba0317e25b435819a2cc23b7dc4bb06483b29fc4820d2e42a226f60643da601f');
const ui = new Interfaz();
const formulario = document.querySelector('#formulario');

//Eevent Listeners
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    //leer moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    //leer criptomoneda seleccionada
    const criptoSelected = document.querySelector('#criptomoneda');
    const criptoSeleccionada = criptoSelected.options[criptoSelected.selectedIndex].value;

    if (monedaSeleccionada === '' || criptoSeleccionada === '') {
        //alerta de error
        ui.mostrarMensaje('Ambos Campos son obligatorios', 'alert bg-danger text-center');
    } else {
        //todo bien, consulta la API
        cotizador.obtenerValores(monedaSeleccionada, criptoSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoSeleccionada)
            })
    }    
})