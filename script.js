const body = document.querySelector("body");

let operation = {
  firstNumber: 2,
  secondNumber: 2,
  operator: "+",
};

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(operation) {
  switch (operation.operator) {
    case "+":
      return add(operation.firstNumber, operation.secondNumber);
      break;
    case "-":
      return subtract(operation.firstNumber, operation.secondNumber);
      break;
    case "*":
      return multiply(operation.firstNumber, operation.secondNumber);
      break;
    case "/":
      return divide(operation.firstNumber, operation.secondNumber);
      break;
    default:
      return "Invalid operator";
  }
}
