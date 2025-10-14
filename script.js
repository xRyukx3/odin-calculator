const body = document.querySelector("body");
const buttonsContainer = document.querySelector(".buttons-container");
const previousOperation = document.querySelector(".previous-operation");
const currentOperation = document.querySelector(".current-operation");

let operation = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: "",
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
  let firstNumber = parseInt(operation.firstNumber);
  let secondNumber = parseInt(operation.secondNumber);
  switch (operation.operator) {
    case "+":
      return add(firstNumber, secondNumber);
      break;
    case "-":
      return subtract(firstNumber, secondNumber);
      break;
    case "X":
      return multiply(firstNumber, secondNumber);
      break;
    case "/":
      return divide(firstNumber, secondNumber);
      break;
    default:
      return "Invalid operator";
  }
}

let strOperation = "";

buttonsContainer.addEventListener("click", (e) => {
  let isDigitButton = e.target.classList.contains("digit");
  let isOperatorButton = e.target.classList.contains("operator");
  let isEqualButton = e.target.classList.contains("eq");

  if (operation.firstNumber === "") {
    if (isDigitButton) {
      strOperation += e.target.textContent;
    } else if (isOperatorButton) {
      operation.firstNumber = strOperation;
      operation.operator = e.target.textContent;
      strOperation = "";
    }
  } else if (operation.secondNumber === "") {
    if (isDigitButton) {
      strOperation += e.target.textContent;
    } else if (isEqualButton) {
      operation.secondNumber = strOperation;
      operation.result = operate(operation);
    } else if (isOperatorButton) {
      operation.secondNumber = strOperation;
      operation.result = operate(operation);
      operation.firstNumber = operation.result;
      operation.operator = e.target.textContent;
      operation.secondNumber = "";
      strOperation = "";
    }
  }
  console.log(operation);
  currentOperation.textContent =
    operation.firstNumber + operation.operator + operation.secondNumber;
});
