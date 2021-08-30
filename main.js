var monto, plazo, tasaAnual, fecha, tasaMensual, mensualidad, IVA = 1.21, intereses, impuestos, capital, insoluto,primerInteres = 0, primerImpuesto = 0, primerCapital = 0, primerInsoluto = 0

var establecerDatos = function(){
    monto = document.getElementById('monto').value
    plazo = document.getElementById('plazo').value
    tasaAnual = document.getElementById('interes').value
    fecha = new Date(document.getElementById('fecha').value)
   
}




function calcularTasaMensual(){
    tasaMensual = (tasaAnual / 100) / 12
    return tasaMensual
}

function tasaMensualconIVA(){
    return (calcularTasaMensual() + (calcularTasaMensual() * IVA));
}

function PagoMensual() {
    var denominador = Math.pow((1 + tasaMensualconIVA()), plazo) - 1
    mensualidad = (tasaMensualconIVA() + (tasaMensualconIVA() / denominador)) * monto
    return mensualidad
}

function calcularTotalPrestamo() {
    var totalPrestamo = 0;
    for (let i = 0; i < plazo; i++) {
        totalPrestamo += mensualidad
    }
    return totalPrestamo
}

function obtenerPagoMensual() {
    return Math.round(PagoMensual(), 2)
}

function obtenerTotalPrestamo() {
    return Math.round(calcularTotalPrestamo(), 2)
}

function Intereses() {
    if (primerInteres == 0) {
        intereses = tasaMensual * monto
        primerInteres = intereses
    } else {
        intereses = tasaMensual * insoluto
    }
    return intereses
}

function Impuestos() {
    if (primerImpuesto == 0) {
        impuestos = primerInteres * IVA
        primerImpuesto = impuestos
    } else {
        impuestos = Intereses() * IVA
    }
    return impuestos
}

function Capital() {
    if (primerCapital == 0) {
        capital = mensualidad - primerInteres - primerImpuesto
        primerCapital = capital
    } else {
        capital = mensualidad - Intereses() - Impuestos()
    }
    return capital
}

function SaldoInsoluto() {
    if (primerInsoluto == 0) {
        insoluto = monto - primerCapital
        primerInsoluto = insoluto
    } else {
        insoluto -= Capital()
    }
    return insoluto
}


     
function simularPrestamo() {
    establecerDatos()
    PagoMensual()
    calcularTotalPrestamo()

    var acumIntereses = 0, acumImpuestos = 0, acumCapital = 0

    var miArreglo = ['No.', 'Fecha', 'Mensualidad', 'Intereses', 'Impuestos', 'Capital', 'Insoluto']

    var tablaAmortizaciones = document.getElementById('amortizaciones')
    var tabla = document.createElement('table')
    var cabeceraTabla = document.createElement('thead')
    var cuerpoTabla = document.createElement('tbody')
    var pieTabla = document.createElement('tfoot')
    var fila = document.createElement("tr")

    // este for, lo utilizo para el header de la tabla
    for (let j = 0; j < miArreglo.length; j++) {
        var celda = document.createElement("td")
        var texto = miArreglo[j]
        var textoCelda = document.createTextNode(texto)
        celda.appendChild(textoCelda)
        fila.appendChild(celda)
    }
    cabeceraTabla.appendChild(fila)
   
    // este for, lo utilizo para el cuerpo de la tabla
    for (let i = 0; i < plazo; i++) {
        var intereses = Intereses(), impuestos = Impuestos(), capital = Capital(), insoluto = SaldoInsoluto()
        
        var fila = document.createElement("tr")
        for (let j = 0; j < miArreglo.length; j++) {
            var celda = document.createElement("td")
            var texto // el texto a mostrar en la celda
            switch(miArreglo[j]) {
                case 'No.':
                    texto = (i+1)
                    break
                case 'Fecha':
                    texto = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear()
                    break
                case 'Mensualidad':
                    texto = '$' + mensualidad.toFixed(2)
                    break
                case 'Intereses':
                    texto = '$' + intereses.toFixed(2)
                    break
                case 'Impuestos':
                    texto = '$' + impuestos.toFixed(2)
                    break
                case 'Capital':
                    texto = '$' + capital.toFixed(2)
                    break
                case 'Insoluto':
                    texto = '$' + Math.abs(insoluto.toFixed(2))
                    break
                default:
                    texto = null
                    break
            }
            var textoCelda = document.createTextNode(texto)
            celda.appendChild(textoCelda)
            fila.appendChild(celda)
        }
        cuerpoTabla.appendChild(fila)
    }

    tabla.appendChild(cabeceraTabla)
    tabla.appendChild(cuerpoTabla)
    tablaAmortizaciones.appendChild(tabla)

}


var l = localStorage;

first_name.addEventListener("focusout", function() {
    l.setItem("fn", first_name.value);
  })

  last_name.addEventListener("focusout", function() {
    l.setItem("ln", last_name.value);
  })

  email.addEventListener("focusout", function() {
    l.setItem("em", email.value);
  })

  profile.addEventListener("focusout", function() {
    l.setItem("pr", profile.value);
  })

  function recuperoValores() {
    first_name.value = l.getItem("fn");
    last_name.value = l.getItem("ln");
    email.value = l.getItem("em");
    profile.value = l.getItem("pr");
  }


  let boton = document.getElementById("btnPrincipal")
  boton.addEventListener("click", respuestaClick)
  function respuestaClick(){
    alert("Formulario Enviado");
  }

 

//jQuery
 
$(".hide").on('click', function() {
    $("nav ul").toggle('slow');
  })


  const typed = new Typed('.typed', {
	

	stringsElement: '#cadenas-texto', // ID del elemento que contiene cadenas de texto a mostrar.
	typeSpeed: 75, // Velocidad en mlisegundos para poner una letra,
	startDelay: 300, // Tiempo de retraso en iniciar la animacion. Aplica tambien cuando termina y vuelve a iniciar,
	backSpeed: 75, // Velocidad en milisegundos para borrrar una letra,
	smartBackspace: true, // Eliminar solamente las palabras que sean nuevas en una cadena de texto.
	shuffle: false, // Alterar el orden en el que escribe las palabras.
	backDelay: 1500, // Tiempo de espera despues de que termina de escribir una palabra.
	loop: true, // Repetir el array de strings
	loopCount: false, // Cantidad de veces a repetir el array.  false = infinite
	showCursor: true, // Mostrar cursor palpitanto
	cursorChar: '|', // Caracter para el cursor
	contentType: 'html', // 'html' o 'null' para texto sin formato
});


const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
//Agregamos un botón con jQuery
$("body").prepend('<button id="btn1">Click aquí cotización DOLAR hoy</button>');
//Escuchamos el evento click del botón agregado
$("#btn1").click(() => { 
    $.get(URLGET, function (respuesta, estado) {
          if(estado === "success"){
            let misDatos = respuesta;
            console.log(respuesta)
            for (const dato of misDatos) {
              $("body").prepend(`<div id="dolar">
                                    <h3>Compra ${dato.casa.nombre}</h3>
                                   <h4>Compra ${dato.casa.compra}</h4>
                                   <h4>Venta ${dato.casa.venta}</h4>
                                  </div>`);
                                                
            }  
          }
    });
})


