// Variabili globali
let randomNumbers = [];
let countdown = 30;
let interval;

// Costanti per gli elementi DOM
const randomNumbersElement = document.getElementById('randomNumbers');
const countdownElement = document.getElementById('countdown');
const numbersSection = document.getElementById('numbers');
const inputsSection = document.getElementById('inputs');
const inputsContainer = document.getElementById('inputFields');
const checkButton = document.getElementById('checkButton');

// Funzione per generare 5 numeri casuali tra 1 e 100
function generateRandomNumbers() {
    for (let i = 0; i < 5; i++) {
        randomNumbers.push(Math.floor(Math.random() * 100) + 1);
    }
}

// Funzione per avviare il gioco
function startGame() {
    generateRandomNumbers();

    // Mostra i numeri casuali
    randomNumbersElement.textContent = randomNumbers.join(' - ');
    numbersSection.style.display = 'block';

    // Avvia il countdown
    interval = setInterval(function() {
        countdownElement.textContent = `Tempo rimanente: ${countdown} secondi`;
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            numbersSection.style.display = 'none';
            showInputs();
        }
    }, 1000);
}

// Funzione per mostrare gli input dopo il countdown
function showInputs() {
    inputsSection.style.display = 'block';

    for (let i = 0; i < 5; i++) {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = `input${i}`;
        inputElement.classList.add('form-control');
        inputElement.placeholder = `Numero ${i + 1}`;
        
        inputContainer.appendChild(inputElement);
        inputsContainer.appendChild(inputContainer);
    }
}

// Funzione per verificare i numeri inseriti
function checkAnswers() {
    const userNumbers = [];
    let valid = true;

    // Ottieni i numeri inseriti dall'utente e valida
    for (let i = 0; i < 5; i++) {
        const inputVal = document.getElementById(`input${i}`).value.trim();
        const inputElement = document.getElementById(`input${i}`);
        
        if (isNaN(inputVal) || inputVal === '') {
            valid = false;
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
        } else {
            inputElement.classList.add('valid');
            inputElement.classList.remove('invalid');
            userNumbers.push(parseInt(inputVal));
        }
    }

    // Se ci sono errori nei campi, blocca la verifica
    if (!valid) {
        alert('Per favore, inserisci solo numeri validi!');
        return;
    }

    // Verifica i numeri indovinati
    const correctNumbers = [];
    userNumbers.forEach(num => {
        if (randomNumbers.includes(num) && !correctNumbers.includes(num)) {
            correctNumbers.push(num);
        }
    });

    // Mostra il risultato
    alert(`Hai indovinato ${correctNumbers.length} numero/i: ${correctNumbers.join(', ')}`);
}

// Avvio del gioco quando la pagina è pronta
window.onload = function() {
    startGame();

    // Quando l'utente clicca su "Controlla"
    checkButton.addEventListener('click', checkAnswers);
};
