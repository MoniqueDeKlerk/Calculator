'use strict';
//Caching the dom
const clear = document.getElementById('clear');
const equals = document.getElementById('equal');
const deletebtn = document.getElementById('delete');
const equal = document.getElementById('equal');
const decimal = document.getElementById('decimal');
const dot = document.getElementById('dot');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const screen = document.getElementById('screen');
const previousScreen = document.querySelector('.previous');
const currentScreen = document.querySelector('.current');

let currentOperator = '';
let firstNum = '';
let secondNum = '';
let result = '';

//Clear button
function clearScreen(btn) {
  btn.addEventListener('click', (btn) => {
    currentOperator = '';
    firstNum = '';
    secondNum = '';
    screen.textContent = '';
  });
}
clearScreen(clear);

//Numbers
numbers.forEach((num) => {
  num.addEventListener('click', (e) => {
    let value = e.target.textContent;

    if (!currentOperator) {
      firstNum = firstNum + value;
      updateScreen(firstNum);
    } else {
      secondNum = secondNum + value;
      updateScreen(secondNum);
    }
  });
});

//Operators
operators.forEach((op) => {
  op.addEventListener('click', (e) => {
    let operator = e.target.textContent;
    currentOperator = operator;
    updateScreen(currentOperator);
  });
});

//Dot
dot.addEventListener('click', (btn) => {
  if (!currentOperator) {
    if (firstNum.includes('.')) {
      return;
    }
    firstNum = firstNum + '.';
    Number.parseFloat(firstNum).toFixed(2);
    updateScreen(firstNum);
  } else {
    if (secondNum.includes('.')) {
      return;
    }
    secondNum = secondNum + '.';
    Number.parseFloat(secondNum).toFixed(2);
    updateScreen(secondNum);
  }
});

//Update Screen
function updateScreen(num) {
  if (screen.textContent.length < 7) {
    screen.textContent = num;
  } else {
    screen.textContent = 'ERROR';
  }
}

// Delete btn
deletebtn.addEventListener('click', (btn) => {
  if (!currentOperator) {
    if (firstNum.length) {
      firstNum = firstNum.slice(0, -1);
      updateScreen(firstNum);
    }
  } else {
    if (secondNum.length) {
      secondNum = secondNum.slice(0, -1);
      updateScreen(secondNum);
    }
  }
});

const calculate = (n1, operator, n2) => {
  if (operator === '+') {
    result = Number.parseFloat(n1) + Number.parseFloat(n2);
    firstNum = result;
    secondNum = '';
  } else if (operator === '-') {
    result = Number.parseFloat(n1) - Number.parseFloat(n2);
    firstNum = result;
    secondNum = '';
  } else if (operator === 'X') {
    result = Number.parseFloat(n1) * Number.parseFloat(n2);
    firstNum = result;
    secondNum = '';
  } else if (operator === '/') {
    if (n2 === '0') {
      result = 'LMAO';
    } else {
      result = Number.parseFloat(n1) / Number.parseFloat(n2);
      firstNum = result;
      secondNum = '';
    }
  }
};

//equals
equals.addEventListener('click', () => {
  calculate(firstNum, currentOperator, secondNum);
  updateScreen(result);
  firstNum = '';
  currentOperator = '';
  secondNum = '';
});
