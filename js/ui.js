class Interfaz {

    constructor() {
        this.init();
    }

    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
        .then(monedas => {
            //crear select de opciones
            const select = document.querySelector('#criptomoneda');
            //para leer los valores de las criptomonedas
            for(const [key, value] of Object.entries(monedas.monedas.Data)) {
                //añadir Symbol y Nombre como opciones
                const opcion = document.createElement('option');
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));
                select.appendChild(opcion);
            }
        })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    //imprime resultado de la cotización
    mostrarResultado(resultado, moneda, crypto) {

        //en caso de resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        if(resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        //recortar dígitos
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-AR');

        //construir template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Cotización:</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}</p>
                    <p>Variación último día % ${porcentaje}</p>
                    <p>Úlitma actualización: ${actualizado}</p>
                </div>
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
            //mostrar resultado
            document.querySelector('#resultado').innerHTML = templateHTML;

            //ocultar spinner
            this.mostrarOcultarSpinner('none');
        }, 3000);
        
    }

    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}