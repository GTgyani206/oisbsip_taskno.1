const display = document.getElementById("result");
const history = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");
let currentValue = "";
let prevValue = "";
let operator = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "clear") {
      currentValue = "";
      prevValue = "";
      operator = null;
      display.value = "";
      history.textContent = "";
    } else if (value === "=") {
      if (prevValue !== "" && operator !== null) {
        temp = currentValue;
        currentValue = operate(prevValue, operator, currentValue);
        display.value = `${prevValue} ${getOperatorSymbol(operator)}  ${temp} `;
        history.textContent = currentValue;
      }
      prevValue = "";
      operator = null;
    } else if (isOperator(value)) {
      if (currentValue !== "") {
        prevValue = currentValue;
        operator = value;
        display.value = `${prevValue} ${getOperatorSymbol(operator)}`;
        currentValue = "";
      }
    } else if (isFunction(value)) {
      temp = currentValue;
      currentValue = performFunction(value, currentValue);
      display.value = `${value}(${temp})`;
      history.textContent = currentValue;
    } else {
      currentValue += value;
      display.value = currentValue;
      history.textContent = "";
    }
  });
});

function isOperator(value) {
  return ["+", "-", "*", "/"].includes(value);
}

function isFunction(value) {
  return ["percent", "sqrt", "square"].includes(value);
}

function getOperatorSymbol(operator) {
  switch (operator) {
    case "+":
      return "+";
    case "-":
      return "-";
    case "*":
      return "×";
    case "/":
      return "÷";
    default:
      return "";
  }
}

function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
    default:
      return "Error";
  }
}

function performFunction(func, value) {
  value = parseFloat(value);
  switch (func) {
    case "percent":
      return value / 100;
    case "sqrt":
      return Math.sqrt(value);
    case "square":
      return value ** 2;
    default:
      return "Error";
  }
}
