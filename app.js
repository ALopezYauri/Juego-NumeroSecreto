let numeroSecreto;
let intentos;
let listaNumeroScreto = [];
let RangoSecretNumber = 10;

function asignarTxtElemt(elemento, texto){
    //ducument sirve para conectar JS y HTML, captura el valor del aprametro elemento y lo almacena en la variable 'elementoHTML'
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarValor(){
    //getEmentById selecciona y retorna el objeto que contenga de la etiqueta HTML con ID 'valorUsuario'
    //"value" hace que se selecione el valor ingresado en la etiqueda con ID = 'valorUsuario'
    let numeroIngresado = parseInt(document.getElementById('valorUsuario').value);
    if (numeroSecreto === numeroIngresado) {
        //Template strings, es la forma de generar cadenas de tecto incluyendo variables
        //operador ternario: permite hacer una comparacion de una variable e indicar un valor en caso se cumpla o incumpla        
        asignarTxtElemt('p',`Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);    
        habilitarBoton('reiniciar');    
        deshabilitarBoton('verificar');
    }else{
        // el usuario no aceto
        if (numeroSecreto < numeroIngresado) {
            asignarTxtElemt('p','El numero secreto es menor');
        } else {
            asignarTxtElemt('p','El numero secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
   document.querySelector('#valorUsuario').value = '';
   
}

function randomNumber(){
    let secretNumber = Math.floor(Math.random() * RangoSecretNumber) + 1;
    //si el numero generado esta dentro de la lista se hace algo caso contrario suelta el numero secreto y se agrega al arreglo
    console.log(listaNumeroScreto);
    //condicion para validar si ya se generaron todos los numeros posibles dentro del rango "RangoSecretNumber"
    if(listaNumeroScreto.length == RangoSecretNumber){
        asignarTxtElemt('p','Ya se genero el maximo de numeros posibles dentro del rango indicado');
    }else{
        if (listaNumeroScreto.includes(secretNumber)) {
            //la funcion se llama a si misma (a esto se le llama recursividad)
            return randomNumber();  
        } else {
            //se ingresa el nuevo valor de "secretNumber" a la lista en la ultima posicion
            listaNumeroScreto.push(secretNumber);
            return secretNumber;
        }
    }  
}

function condiconesIniciales(params) {
    asignarTxtElemt('h1','secret number');
    asignarTxtElemt('p',`selecciona un numero del 1 al ${RangoSecretNumber}`);
    //generar el numero aleatorio
    numeroSecreto = randomNumber();
    console.log(numeroSecreto);
    //reiniciar el numero de intentos
    intentos = 1;
}

function reiniciarJuego() {
    //seleccionar las condiciones iniciales
    condiconesIniciales();
    //limpiar caja  
    limpiarCaja();       
    //deshabilitar boton nuevo juego ID= reiniciar
    deshabilitarBoton('reiniciar');
    //habilitamos boton itentar ID = verificar
    habilitarBoton('verificar');
}

function habilitarBoton(idBoton) {
    //Este código selecciona el botón con el ID "reiniciar" y remueve el atributo disabled
    document.getElementById(idBoton).removeAttribute('disabled');    
}

function deshabilitarBoton(idBoton) {
    //Este código selecciona el botón con el ID "verificar" y luego establece el atributo disabled a true
    document.getElementById(idBoton).setAttribute('disabled', 'true'); 
}

condiconesIniciales();