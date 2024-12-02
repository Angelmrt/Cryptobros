const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const botonesGrafico = document.querySelector('#botones-grafico');

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
    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
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
    cargarDatos('histoday');
    crearBotones();
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

function cargarDatos(tipo) {
    const { criptomoneda, moneda } = objBusqueda;

    if (!criptomoneda || !moneda) return;

    const url = `https://min-api.cryptocompare.com/data/v2/${tipo}?fsym=${criptomoneda}&tsym=${moneda}&limit=100`;

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
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            },
            labels: {
                style: {
                    colors: '#ffffff', // Texto del eje Y en blanco
                }
            }
        },
        theme: {
            mode: 'dark' // Tema oscuro para un mejor contraste
        }
    };

    window.miGrafico = new ApexCharts(document.querySelector("#grafico"), opciones);
    window.miGrafico.render();
}

function crearBotones() {
    botonesGrafico.innerHTML = '';

    const tipos = [
        
        { id: 'histoday', texto: 'Día' },
        { id: 'histohour', texto: 'Hora' },
        { id: 'histominute', texto: 'Minuto' }
    ];

    tipos.forEach(tipo => {
        const boton = document.createElement('button');
        boton.textContent = tipo.texto;
        boton.classList.add('btn', 'btn-secondary', 'mx-2', 'bg-primary','text-white');

        boton.addEventListener('click', () => cargarDatos(tipo.id));

        botonesGrafico.appendChild(boton);
    });
}
