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
let resultDisplayed = false;

function updateDisplay() {
  const display = document.querySelector('.display');

  if (displayValue.includes('.') && displayValue.length > 10) {
    display.textContent = parseFloat(displayValue).toFixed(6);
  }  
  if(displayValue.length > 10) {
    display.innerText = displayValue.substring(0, 10);
  }
  else {
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
  if (resultDisplayed) {
    displayValue = number;
    firstOperand = null;
    activeOperator = null;
    resultDisplayed = false;
  } else if (isSecondOperand) {
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
  resultDisplayed = false; 
  updateDisplay();
}

function solution() {
  if (activeOperator && !isSecondOperand) {
    const result = operate(activeOperator, firstOperand, displayValue);
    displayValue = `${result}`;
    firstOperand = result;
    activeOperator = null;
    resultDisplayed = true; 
    updateDisplay();
  }
}

document.querySelectorAll('.number').forEach(button => {
  button.addEventListener('click', () => inputNumber(button.textContent));
});

document.addEventListener('keydown', (event) => {
  if (!isNaN(event.key)) {
    inputNumber(event.key);
  }
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '*': 
    case '+': 
    case '-': 
    case '/': 
      const operatorButtons = document.querySelectorAll('.operator');
      operatorButtons.forEach(button => {
        if (button.textContent === event.key) {
          button.click(); 
        }
      }); 
      break;
    case 'Enter':
    case '=': 
      equalsBtn.click(); 
      break;
    case '%': 
      document.querySelector('.percent').click(); 
      break;
    case 'Backspace': 
    case 'Delete':
      document.querySelector('.clear').click(); 
      break;
    case ',': 
    case '.':
      document.querySelector('.decimal').click(); 
      break;
  }
});

const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const operatorBtns = document.querySelectorAll('.operator');

const clearSelectedOperator = () => operatorBtns.forEach(opBtn => opBtn.classList.remove('selected'));;

operatorBtns.forEach(opBtn => {
  opBtn.addEventListener('click', () => {
    operatorBtns.forEach(opBtn => opBtn.classList.remove('selected'));
    opBtn.classList.add('selected');
    handleOperator(opBtn.textContent);
  });
});

equalsBtn.addEventListener('click', () => clearSelectedOperator());
clearBtn.addEventListener('click', () => clearSelectedOperator());

equalsBtn.addEventListener('click', solution);
clearBtn.addEventListener('click', clearCalculator);
document.querySelector('.decimal').addEventListener('click', inputDecimal);
document.querySelector('.toggle-sign').addEventListener('click', toggleSign);
document.querySelector('.percent').addEventListener('click', percent);