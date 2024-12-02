

# Cryptobros

**Cryptobros** es una aplicación web que utiliza la API de [CryptoCompare](https://min-api.cryptocompare.com/) para obtener información en tiempo real sobre criptomonedas y divisas seleccionadas. Utiliza **ApexCharts** para generar gráficos interactivos de velas, permitiendo a los usuarios visualizar la evolución de las criptomonedas de manera detallada.

## Enlace a la aplicacion

**[Pulsa aqui para ver la pagina](https://angelmrt.github.io/Cryptobros/)**

## Características

- **Selección de Criptomonedas y Divisas**: Permite al usuario seleccionar la criptomoneda y la divisa para consultar sus estadísticas.
- **Gráfico de Velas**: Genera un gráfico interactivo que muestra la evolución de los precios de las criptomonedas.
- **Estadísticas en Tiempo Real**: Muestra estadísticas actualizadas sobre el precio, el cambio en las últimas 24 horas, los precios más altos y bajos del día y la última actualización.
- **Interactividad del Gráfico**: Los usuarios pueden ver el gráfico a nivel de minutos, horas o días, gracias a los botones de selección.

## Tecnologías Utilizadas

- **API de CryptoCompare**: Para obtener datos sobre criptomonedas en tiempo real.
- **ApexCharts**: Para la visualización gráfica de datos, específicamente para los gráficos de velas.
- **JavaScript (ES6)**: Para la lógica de la aplicación.
- **HTML5 y CSS3**: Para la estructura y el estilo de la aplicación.
- **Bootstrap 5**: Para el diseño y la creación de una interfaz limpia y responsive.

## Instalación

### Clonar el repositorio

Para comenzar a utilizar **Cryptobros** localmente, sigue estos pasos:

1. Clona el repositorio desde GitHub:
    ```bash
    git clone https://github.com/tu-usuario/cryptobros.git
    ```

2. Accede al directorio del proyecto:
    ```bash
    cd cryptobros
    ```

3. Abre el archivo `index.html` en tu navegador.

## Uso

### Selección de Criptomoneda y Divisa

- En la parte superior de la aplicación, se puede seleccionar una criptomoneda y una divisa (por ejemplo, **USD**, **EUR**, o **GBP**).
- Al seleccionar ambos valores y hacer clic en **Consultar estadísticas**, la aplicación obtiene información en tiempo real sobre el precio, las variaciones en las últimas 24 horas, y otros detalles de la criptomoneda seleccionada.

### Estadísticas

Cuando se realiza una consulta, se mostrarán las siguientes estadísticas:

- **Precio Actual**: El valor de la criptomoneda seleccionada en la divisa elegida.
- **Precio Máximo del Día**: El precio más alto alcanzado durante el día.
- **Precio Mínimo del Día**: El precio más bajo alcanzado durante el día.
- **Variación en las Últimas 24 Horas**: El cambio porcentual del precio de la criptomoneda en las últimas 24 horas.
- **Última Actualización**: El momento en que se actualizó la información de la criptomoneda.

### Gráfico de Velas

Además de las estadísticas, se genera un gráfico de velas interactivo que muestra la evolución de la criptomoneda a lo largo del tiempo. Este gráfico es interactivo y puedes:

- **Hacer Zoom**: Ver detalles más finos de la evolución de precios.
- **Desplazarse**: Navegar por el gráfico para ver el comportamiento de la criptomoneda en diferentes rangos de tiempo.
- **Ver Datos Específicos**: Al pasar el ratón sobre una vela, puedes ver información detallada sobre el precio de apertura, cierre, máximo y mínimo para ese período.

### Intervalos de Tiempo del Gráfico

Los usuarios pueden elegir entre tres tipos de intervalos de tiempo para visualizar los gráficos:

1. **Día**: Muestra los datos históricos del día (últimas 24 horas).
2. **Hora**: Muestra los datos históricos de la última hora.
3. **Minuto**: Muestra los datos históricos por cada minuto.

Estos intervalos se seleccionan mediante los botones ubicados debajo del gráfico.

## Código de Funcionamiento

El código de **Cryptobros** consta de dos partes principales:

### HTML (Vista Principal)

El archivo `index.html` contiene la estructura básica de la aplicación, que incluye:

- Un formulario para seleccionar la criptomoneda y la divisa.
- Un área para mostrar las estadísticas de la criptomoneda.
- Un área para mostrar el gráfico interactivo.
- Botones para elegir los intervalos de tiempo del gráfico.

### JavaScript (Lógica de la Aplicación)

El archivo `main.js` contiene la lógica para interactuar con la API de CryptoCompare, procesar los datos y generar los gráficos:

1. **Obtener Criptomonedas**: Se consulta la API de CryptoCompare para obtener una lista de las principales criptomonedas y se agregan como opciones en un `<select>`.
2. **Consultar API de Precios**: Al seleccionar una criptomoneda y una divisa, se hace una consulta a la API para obtener los precios actuales y las estadísticas de la criptomoneda.
3. **Generar Gráfico de Velas**: Se consulta la API para obtener los datos históricos (por ejemplo, precios de apertura, cierre, máximo y mínimo), y se usa **ApexCharts** para crear el gráfico de velas.

### Funciones Clave

- `consultarCriptomonedas()`: Obtiene las criptomonedas disponibles desde la API de CryptoCompare.
- `consultarAPI()`: Obtiene los datos de precios actuales de la criptomoneda seleccionada.
- `cargarDatos(tipo)`: Carga los datos históricos (día, hora, minuto) de la criptomoneda para generar el gráfico.
- `crearGrafico(datosVelas)`: Genera el gráfico de velas utilizando **ApexCharts** con los datos históricos proporcionados.
- `mostrarCotizacionHTML()`: Muestra las estadísticas de la criptomoneda (precio, máximo, mínimo, etc.) en la interfaz.

## Contribuciones


1. Ángel Martín Rubio
2. Daniel Hervás Muñoz
3. Ignacio Ramos Martín

## Licencia

Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
