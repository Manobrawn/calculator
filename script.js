function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Can't divide by 0";
  return a / b;
}

function toggleSign() {
  if (displayValue !== '0') {
    displayValue = displayValue.startsWith('-') ? displayValue.slice(1) : `-${displayValue}`;
    updateDisplay();
  }
}

function percent() {
  displayValue = (parseFloat(displayValue) / 100).toString();
  updateDisplay();
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

let displayValue = '0';
let firstOperand = null;
let activeOperator = null;
let isSecondOperand = false;

function updateDisplay() {
  const display = document.querySelector('.display');

  if (displayValue.includes('.') && displayValue.length > 10) {
    display.textContent = parseFloat(displayValue).toFixed(6);
  } else {
    display.textContent = displayValue;
  }
}

function clearCalculator() {
  displayValue = '0';
  firstOperand = null;
  activeOperator = null;
  isSecondOperand = false;
  updateDisplay();
}

function inputNumber(number) {
  if (isSecondOperand) {
    displayValue = number;
    isSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? number : displayValue + number;
  }
  updateDisplay();
}

function inputDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function handleOperator(newOperator) {
  if (activeOperator && isSecondOperand) {
    activeOperator = newOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = displayValue;
  } else if (activeOperator) { 
    const result = operate(activeOperator, firstOperand, displayValue);
    displayValue = `${result}`;
    firstOperand = result;
  }

  activeOperator = newOperator;
  isSecondOperand = true;
  updateDisplay();
}

function solution() {
  if (activeOperator && !isSecondOperand) {
    const result = operate(activeOperator, firstOperand, displayValue);
    displayValue = `${result}`;
    firstOperand = result;
    activeOperator = null;
    updateDisplay();
  }
}

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => inputNumber(button.textContent));
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => handleOperator(button.textContent));
});

document.querySelector('.equals').addEventListener('click', solution);

document.querySelector('.clear').addEventListener('click', clearCalculator);

document.querySelector('.decimal').addEventListener('click', inputDecimal);

document.querySelector('.toggle-sign').addEventListener('click', toggleSign);

document.querySelector('.percent').addEventListener('click', percent);