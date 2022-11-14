// inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let tempororizador = false;
let timer = 50;
let tiempoRegresivoid = null;
let timerinicial = 50;

// apuntando a documento html
let mostrarMovimientos = document.getElementById(`Movimientos`);
let mostrarAciertos = document.getElementById(`aciertos`);
let mostrarTiempo = document.getElementById(`t-restante`);

// generacion de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});
console.log(numbers);

// funciones
function contarTiempo() {
  tiempoRegresivoid = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      clearInterval(tiempoRegresivoid);
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numbers[i];
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal

function destapar(id) {
  if (tempororizador == false) {
    contarTiempo();
    tempororizador = true;
  }

  tarjetasDestapadas++;
  console.log(tarjetasDestapadas);

  if (tarjetasDestapadas == 1) {
    //mostrar el primer numero
    tarjeta1 = document.getElementById(id);
    primerResultado = numbers[id];
    tarjeta1.innerHTML = primerResultado;

    //deshabilitar el primer boton

    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas == 2) {
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numbers[id];
    tarjeta2.innerHTML = segundoResultado;

    //desahabilitar el segundo boton
    tarjeta2.disabled = true;

    //incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    if (primerResultado == segundoResultado) {
      //encerar contador tarjetas destapadas
      tarjetasDestapadas = 0;

      //aumentar aciertos
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiempoRegresivoid);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😲`;
        mostrarTiempo.innerHTML = `Fantastico! 🎉 Solo Demorastes ${
          timerinicial - timer
        } segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤙`;
      }
    } else {
      //mostrar momentaneament valores y volver a tapar
      setTimeout(() => {
        tarjeta1.innerHTML = ` `;
        tarjeta2.innerHTML = ` `;
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}
