function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide (a, b) {
  if (b === 0) return "Can't divide by 0";
  return a / b;
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
let currentOperand = null;
let awaitingSecondOperand = false;

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
  currentOperand = null;
  awaitingSecondOperand = false;
  updateDisplay();
}