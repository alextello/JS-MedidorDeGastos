const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const lista = document.getElementById('list');
const form = document.getElementById('form');
const texto = document.getElementById('text');
const cantidad = document.getElementById('amount');

const dummytransacciones = [
    { id: 1, text: 'Flores', cantidad: -20 },
    { id: 2, text: 'Salario', cantidad: 300 },
    { id: 3, text: 'Libro', cantidad: -10 },
    { id: 4, text: 'Camara', cantidad: 150 },
];

let transacciones = dummytransacciones;


function addtransaccion(e) {
    e.preventDefault();
    if (texto.nodeValue?.trim() === '' || cantidad.value.trim() === '') {
        alert('añade una cantidad');
    } else {
        const transaccion = {
            id: +generarID(),
            text: texto.value,
            cantidad: +cantidad.value
        };
        transacciones.push(transaccion);
        addtransaccionDOM(transaccion);
        updateValues();
        texto.value = '';
        cantidad.value = '';
    }
}

// Generar ID random
function generarID() {
    return Math.floor(Math.random() * 100000000);
}

function addtransaccionDOM(transaccion) {
    // Obtener signo
    const sign = transaccion.cantidad < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Añadir la clase según el valor
    item.classList.add(transaccion.cantidad < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaccion.text} <span>${sign}${Math.abs(transaccion.cantidad)}
    <button class="delete-btn" onclick="removerTransaccion(${transaccion.id})">x</button>
    </span>
    `;

    lista.appendChild(item);
}

// Remover transaccion 
function removerTransaccion(id) {
    transacciones = transacciones.filter(transaccion => transaccion.id !== id);
    init();
}

// Actalizar balance, entradas y salidaas
function updateValues() {
    const cantidades = transacciones.map(transaccion => transaccion.cantidad);
    const total = cantidades.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const entradas = cantidades
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const gastos = (cantidades.filter(item => item < 0).reduce((acc, item) => (acc += item), 0)
        *
        -1
    ).toFixed(2);
    balance.innerHTML = `$${total}`;
    moneyPlus.innerText = `$${entradas}`;
    moneyMinus.innerHTML = `$${gastos}`;
}
// init

function init() {
    lista.innerHTML = '';
    transacciones.forEach(addtransaccionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addtransaccion);