const btnAgregarGasto = document.querySelector('#agrega-gasto');
const tablaPresupuesto = document.querySelector('#tabla1 tbody');
const inputPresupuesto = document.querySelector('#valor1');
const inputNombreGasto = document.querySelectorAll('.ingresar2')[0];
const inputMontoGasto = document.querySelectorAll('.ingresar2')[1];

const tablaGastos = document.querySelector('#tabla2 tbody');

let presupuestoTotal = 0;
let gastos = [];

// actualización de tablas
function actualizarTablas() {
  //0
  tablaPresupuesto.innerHTML = `
    <tr>
      <td>$${presupuestoTotal}</td>
      <td>$${gastos.reduce((gasto, total) => total + gasto.monto, 0)}</td>
      <td>$${
        presupuestoTotal -
        gastos.reduce((total, gasto) => total + gasto.monto, 0)
      }</td>
    </tr>
  `;

  //1
  tablaGastos.innerHTML = '';
  gastos.forEach((gasto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${gasto.nombre}</td>
      <td>$${gasto.monto}</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm" onclick="eliminarGasto(${index})">
          Eliminar
        </button>
      </td>
    `;
    tablaGastos.appendChild(row);
  });
}

// haciendo clic en calcular
function agregarValor1() {
  const valor = parseInt(inputPresupuesto.value);
  if (!isNaN(valor)) {
    presupuestoTotal = valor;
    actualizarTablas();
  }
}

// se ejecuta al hacer clic en el boton añadir gasto
btnAgregarGasto.addEventListener('click', () => {
  const nombre = inputNombreGasto.value.trim();
  const monto = parseInt(inputMontoGasto.value);
  if (nombre !== '' && !isNaN(monto)) {
    gastos.push({ nombre, monto });
    actualizarTablas();
    inputNombreGasto.value = '';
    inputMontoGasto.value = '';
  }
});

// ejecuta con clic el boton eliminar de un gasto
function eliminarGasto(index) {
  gastos.splice(index, 1);
  actualizarTablas();
}
