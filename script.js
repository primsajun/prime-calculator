// Variables to store calculator state
let currentInput = '0';
let previousInput = '';
let calculationOperator = '';
let result = null;
let memory = 0;
let waitingForOperand = false;

// DOM elements
const display = document.getElementById('display');
const history = document.getElementById('history');

// Update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Update the history display
function updateHistory() {
    history.textContent = previousInput;
}

// Append a number to the current input
function appendNumber(number) {
    if (waitingForOperand) {
        currentInput = number.toString();
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? number.toString() : currentInput + number.toString();
    }
    updateDisplay();
}

// Append a decimal point
function appendDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

// Handle operators
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

// Get the display symbol for operators
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

// Calculate the result
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
    
    // Update history with the complete calculation
    previousInput += currentInput + ' = ' + newResult;
    updateHistory();
    
    // Update result and display
    result = newResult;
    currentInput = newResult.toString();
    updateDisplay();
    
    // Reset for next calculation
    waitingForOperand = true;
    calculationOperator = '';
}

// Clear all entries and reset calculator
function clearAll() {
    currentInput = '0';
    previousInput = '';
    calculationOperator = '';
    result = null;
    waitingForOperand = false;
    updateDisplay();
    updateHistory();
}

// Clear current entry only
function clearEntry() {
    currentInput = '0';
    waitingForOperand = false;
    updateDisplay();
}

// Calculate square root
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

// Calculate square
function calculateSquare() {
    const inputValue = parseFloat(currentInput);
    previousInput = '(' + currentInput + ')²';
    currentInput = (inputValue * inputValue).toString();
    updateHistory();
    updateDisplay();
    waitingForOperand = true;
}

// Calculate cube
function calculateCube() {
    const inputValue = parseFloat(currentInput);
    previousInput = '(' + currentInput + ')³';
    currentInput = (inputValue * inputValue * inputValue).toString();
    updateHistory();
    updateDisplay();
    waitingForOperand = true;
}

// Backspace function
function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

// Memory functions
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

// Initialize display
updateDisplay();

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers
    if (/^[0-9]$/.test(key)) {
        appendNumber(parseInt(key));
    }
    // Operators
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
    // Decimal
    else if (key === '.') {
        appendDecimal();
    }
    // Calculate
    else if (key === '=' || key === 'Enter') {
        calculate();
    }
    // Clear
    else if (key === 'Escape') {
        clearAll();
    }
    // Backspace
    else if (key === 'Backspace') {
        backspace();
    }
});