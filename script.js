const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const lista = document.getElementById('list');
const form = document.getElementById('form');
const texto = document.getElementById('text');
const cantidad = document.getElementById('amount');

const dummyTransactions = [
    { id: 1, text: 'Flores', amount: -20 },
    { id: 2, text: 'Salario', amount: 300 },
    { id: 3, text: 'Libro', amount: -10 },
    { id: 4, text: 'Camara', amount: 150 },
];

let transactions = dummyTransactions;

function addTransactionDOM(transaction) {
    // Obtener signo
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Añadir la clase según el valor
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
    <button class="delete-btn">x</button>
    </span>
    `;

    lista.appendChild(item);
}

// init

function init() {
    lista.innerHTML = '';
    transactions.forEach(addTransactionDOM);
}

init();