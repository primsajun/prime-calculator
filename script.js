
let currentInput = '0';
let previousInput = '';
let calculationOperator = '';
let result = null;
let memory = 0;
let waitingForOperand = false;


const display = document.getElementById('display');
const history = document.getElementById('history');


function updateDisplay() {
    display.textContent = currentInput;
}


function updateHistory() {
    history.textContent = previousInput;
}


function appendNumber(number) {
    if (waitingForOperand) {
        currentInput = number.toString();
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? number.toString() : currentInput + number.toString();
    }
    updateDisplay();
}


function appendDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}


function appendOperator(operator) {
    const inputValue = parseFloat(currentInput);
    
    if (calculationOperator && !waitingForOperand) {
        calculate();
    } else if (result === null) {
        result = inputValue;
    }
    
    previousInput = currentInput + ' ' + getOperatorSymbol(operator) + ' ';
    calculationOperator = operator;
    waitingForOperand = true;
    updateHistory();
}


function getOperatorSymbol(operator) {
    switch(operator) {
        case '+': return '+';
        case '-': return '-';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        case '**': return '^';
        default: return operator;
    }
}

function calculate() {
    const inputValue = parseFloat(currentInput);
    
    if (isNaN(result)) {
        result = inputValue;
        return;
    }
    
    let newResult;
    
    switch(calculationOperator) {
        case '+':
            newResult = result + inputValue;
            break;
        case '-':
            newResult = result - inputValue;
            break;
        case '*':
            newResult = result * inputValue;
            break;
        case '/':
            if (inputValue === 0) {
                clearAll();
                currentInput = 'Error: Division by zero';
                updateDisplay();
                return;
            }
            newResult = result / inputValue;
            break;
        case '%':
            newResult = result % inputValue;
            break;
        case '**':
            newResult = Math.pow(result, inputValue);
            break;
        default:
            newResult = inputValue;
    }
    
    
    previousInput += currentInput + ' = ' + newResult;
    updateHistory();
    
   
    result = newResult;
    currentInput = newResult.toString();
    updateDisplay();
    
   
    waitingForOperand = true;
    calculationOperator = '';
}


function clearAll() {
    currentInput = '0';
    previousInput = '';
    calculationOperator = '';
    result = null;
    waitingForOperand = false;
    updateDisplay();
    updateHistory();
}


function clearEntry() {
    currentInput = '0';
    waitingForOperand = false;
    updateDisplay();
}


function calculateSquareRoot() {
    const inputValue = parseFloat(currentInput);
    
    if (inputValue < 0) {
        clearAll();
        currentInput = 'Error: Invalid input';
        updateDisplay();
        return;
    }
    
    previousInput = '√(' + currentInput + ')';
    currentInput = Math.sqrt(inputValue).toString();
    updateHistory();
    updateDisplay();
    waitingForOperand = true;
}


function calculateSquare() {
    const inputValue = parseFloat(currentInput);
    previousInput = '(' + currentInput + ')²';
    currentInput = (inputValue * inputValue).toString();
    updateHistory();
    updateDisplay();
    waitingForOperand = true;
}


function calculateCube() {
    const inputValue = parseFloat(currentInput);
    previousInput = '(' + currentInput + ')³';
    currentInput = (inputValue * inputValue * inputValue).toString();
    updateHistory();
    updateDisplay();
    waitingForOperand = true;
}


function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}


function clearMemory() {
    memory = 0;
}

function recallMemory() {
    currentInput = memory.toString();
    waitingForOperand = false;
    updateDisplay();
}

function addToMemory() {
    memory += parseFloat(currentInput);
}

function subtractFromMemory() {
    memory -= parseFloat(currentInput);
}


updateDisplay();


document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    
    if (/^[0-9]$/.test(key)) {
        appendNumber(parseInt(key));
    }
    
    else if (key === '+') {
        appendOperator('+');
    }
    else if (key === '-') {
        appendOperator('-');
    }
    else if (key === '*') {
        appendOperator('*');
    }
    else if (key === '/') {
        appendOperator('/');
    }
    else if (key === '%') {
        appendOperator('%');
    }
    else if (key === '^') {
        appendOperator('**');
    }
   
    else if (key === '.') {
        appendDecimal();
    }
    
    else if (key === '=' || key === 'Enter') {
        calculate();
    }

    else if (key === 'Escape') {
        clearAll();
    }

    else if (key === 'Backspace') {
        backspace();
    }
});
