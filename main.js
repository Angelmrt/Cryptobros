const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
};

const obtenerCriptomonedas = criptomonedas => new Promise(resolve => {
    resolve(criptomonedas);
});

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', actualizarGrafico);
    monedaSelect.addEventListener('change', actualizarGrafico);
});

function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriptomonedas(resultado.Data))
        .then(criptomonedas => selectCriptomonedas(criptomonedas))
        .catch(error => console.log(error));
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();

    const { moneda, criptomoneda } = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    consultarAPI();
    cargarDatosHistoricos(criptomoneda, moneda);
}

function mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector('.error');
    if (!existeAlerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');
        divMensaje.textContent = mensaje;
        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}

function consultarAPI() {
    const { moneda, criptomoneda } = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    mostrarSpinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
        });
}

function mostrarCotizacionHTML(cotizacion) {
    limpiarHTML();

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span> ${PRICE} </span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio más alto del día: <span>${HIGHDAY}</span></p>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio más bajo del día: <span>${LOWDAY}</span></p>`;

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML = `<p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>`;

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `<p>Última Actualización: <span>${LASTUPDATE}</span></p>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimaActualizacion);
}

function mostrarSpinner() {
    limpiarHTML();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>    
    `;

    resultado.appendChild(spinner);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function cargarDatosHistoricos(cripto, divisa) {
    if (!cripto || !divisa) return; 

    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cripto}&tsym=${divisa}&limit=100`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const historico = data.Data.Data;

            const datosVelas = historico.map(dato => ({
                x: new Date(dato.time * 1000),
                y: [dato.open, dato.high, dato.low, dato.close]
            }));

            crearGrafico(datosVelas);
        })
        .catch(error => console.error("Error al obtener los datos históricos:", error));
}

function crearGrafico(datosVelas) {
    if (window.miGrafico) {
        window.miGrafico.destroy();
    }

    const opciones = {
        series: [
            {
                data: datosVelas
            }
        ],
        chart: {
            type: 'candlestick', 
            height: 350, 
            toolbar: {
                show: false 
            }
        },
        title: {
            text: 'Grafico Criptomonedas',
            align: 'left',
            style: {
                color: '#ffffff' 
            }
        },
        xaxis: {
            type: 'datetime', 
            labels: {
                style: {
                    colors: '#ffffff', 
                }
            }
        },
        yaxis: {
            tooltip: {
                enabled: true 
            },
            labels: {
                style: {
                    colors: '#ffffff', 
                }
            }
        },
        grid: {
            borderColor: '#444444',
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#00ff00', 
                    downward: '#ff0000' 
                }
            }
        },
        theme: {
            mode: 'dark' 
        }
    };

    window.miGrafico = new ApexCharts(document.querySelector("#grafico"), opciones);
    window.miGrafico.render();
}

function actualizarGrafico() {
    leerValor({ target: this });
    const { criptomoneda, moneda } = objBusqueda;
    cargarDatosHistoricos(criptomoneda, moneda);
}
