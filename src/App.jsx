import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const calculateRes = (val) => {
    let result;
    try {
      const operators = ["+", "-", "*", "/", "%"];
      let operator = null;
      for (let i = 0; i < val.length; i++) {
        if (operators.includes(val[i])) {
          operator = val[i];
          break;
        }
      }
      if (!operator) {
        setInput(parseFloat(val).toString());
        return;
      }
      const [operand1, operand2] = val.split(operator).map(parseFloat);

      if (isNaN(operand1) || isNaN(operand2)) {
        throw new Error("Invalid input");
      }

      switch (operator) {
        case "+":
          result = operand1 + operand2;
          break;
        case "-":
          result = operand1 - operand2;
          break;
        case "*":
          result = operand1 * operand2;
          break;
        case "/":
          if (operand2 === 0) {
            throw new Error("Cannot divide by zero");
          }
          result = operand1 / operand2;
          break;
        case "%":
          result = (operand1 * operand2) / 100;
          break;
        default:
          throw new Error("Invalid input");
      }
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleButtonClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "<") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      calculateRes(input);
    } else {
      // Prevent multiple operators in a row
      const lastChar = input[input.length - 1];
      if (
        ["+", "-", "*", "/", "%"].includes(lastChar) &&
        ["+", "-", "*", "/", "%"].includes(value)
      ) {
        return;
      }
      setInput((preValue) => preValue + value);
    }
  };

  return (
    <div className="container">
      <div className="calc">
        <h1 id="input">{input}</h1>
        <div>
          <button onClick={() => handleButtonClick("C")}>C</button>
          <button onClick={() => handleButtonClick("<")}>&lt;</button>
          <button onClick={() => handleButtonClick("%")}>%</button>
          <button onClick={() => handleButtonClick("/")}>/</button>
        </div>
        <div>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button onClick={() => handleButtonClick("*")}>*</button>
        </div>
        <div>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
        </div>
        <div>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
        </div>
        <div>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick("00")}>00</button>
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button onClick={() => handleButtonClick("=")}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
