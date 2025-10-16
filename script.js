const buttonsContainer = document.querySelector(".buttons-container");
const previousOperation = document.querySelector(".previous-operation");
const currentOperation = document.querySelector(".current-operation");

let calculator = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  result: "",
  waitingForNewNumber: true,
  waitingForNewOperator: false,
};

function calculate() {
  let firstNumber = parseFloat(calculator.firstNumber);
  let secondNumber = parseFloat(calculator.secondNumber);
  let result;

  switch (calculator.operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "X":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
      break;
    default:
      result = "Invalid operator";
  }
  if (typeof result === "number") {
    result = parseFloat(result.toFixed(10));
  }
  return result.toString();
}

function handleDigit(value) {
  if (currentDisplay === "0" || calculator.waitingForNewNumber) {
    currentDisplay = value;
    calculator.waitingForNewNumber = false;
    calculator.waitingForNewOperator = true;
  } else {
    currentDisplay += value;
  }
}

function handleOperator(value) {
  if (calculator.operator === "" && calculator.waitingForNewOperator) {
    calculator.firstNumber = currentDisplay;
    calculator.operator = value;
    calculator.waitingForNewNumber = true;
    calculator.waitingForNewOperator = false;
  } else if (calculator.waitingForNewOperator) {
    calculator.secondNumber = currentDisplay;
    displayPreviousOperation();
    calculator.result = calculate();
    calculator.operator = value;
    calculator.firstNumber = calculator.result;
    calculator.secondNumber = "";
    currentDisplay = calculator.result;
    calculator.waitingForNewNumber = true;
    calculator.waitingForNewOperator = false;
  } else if (!calculator.waitingForNewOperator) {
    calculator.operator = value;
    calculator.firstNumber = currentDisplay;
    calculator.waitingForNewNumber = true;
  }
}

function handleEq() {
  if (!calculator.waitingForNewNumber) {
    calculator.secondNumber = currentDisplay;
  }
  if (calculator.firstNumber === "") {
    calculator.firstNumber = "0";
  }
  if (
    calculator.firstNumber !== "" &&
    calculator.secondNumber !== "" &&
    calculator.operator !== ""
  ) {
    displayPreviousOperation();
    calculator.result = calculate();
    currentDisplay = calculator.result;
    calculator.firstNumber = calculator.result;
    calculator.secondNumber = "";
    calculator.operator = "";
    calculator.result = "";
    calculator.waitingForNewNumber = true;
    calculator.waitingForNewOperator = true;
  }
}

function changeSign() {
  const number = parseFloat(currentDisplay);
  if (!isNaN(number) && currentDisplay !== "0") {
    currentDisplay = (number * -1).toString();
  }
}

function handleDecimal() {
  if (calculator.waitingForNewNumber) {
    currentDisplay = "0.";
    calculator.waitingForNewNumber = false;
    return;
  }
  if (!currentDisplay.includes(".")) {
    currentDisplay += ".";
  }
}

function clearAll() {
  calculator.firstNumber = "";
  calculator.secondNumber = "";
  calculator.operator = "";
  calculator.result = "";
  calculator.waitingForNewNumber = true;
  calculator.waitingForNewOperator = false;
  currentDisplay = "0";
  displayPreviousOperation();
}

function clearEntry() {
  currentDisplay = "0";
}

function clearDigit() {
  currentDisplay = currentDisplay.slice(0, -1);
  if (currentDisplay === "") {
    currentDisplay = "0";
  }
}

function displayCurrentOperation() {
  currentOperation.textContent = currentDisplay;
}

function displayPreviousOperation() {
  previousOperation.textContent =
    calculator.firstNumber +
    " " +
    calculator.operator +
    " " +
    calculator.secondNumber;
}

function operate(e) {
  //Boolean variables for state management
  const isDigit = e.target.classList.contains("digit");
  const isOperator = e.target.classList.contains("operator");
  const isEq = e.target.classList.contains("eq");
  const isSignToggle = e.target.classList.contains("sign");
  const isClearAll = e.target.classList.contains("ca");
  const isClearEntry = e.target.classList.contains("ce");
  const isClearDigit = e.target.classList.contains("cd");
  const isDot = e.target.classList.contains("dot");

  //Target values
  const buttonValue = e.target.textContent;
  const clickedElement = e.target;

  if (isDigit) {
    handleDigit(buttonValue);
  } else if (isOperator) {
    handleOperator(buttonValue);
  } else if (isEq) {
    handleEq();
  } else if (isSignToggle) {
    changeSign();
  } else if (isDot) {
    handleDecimal();
  } else if (isClearAll) {
    clearAll();
  } else if (isClearEntry) {
    clearEntry();
  } else if (isClearDigit) {
    clearDigit();
  }
  displayCurrentOperation();
}

let currentDisplay = "0";

buttonsContainer.addEventListener("click", (e) => {
  operate(e);
});

displayCurrentOperation();
