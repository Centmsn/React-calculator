import React, { useState } from "react";
import Result from "./Result";
import Keypad from "./Keypad";
import "../css/calculator.css";

const Calculator = () => {
  const [screenValue, setScreenValue] = useState("");

  const handleScreenDisplay = (e) => {
    const value = e.target.textContent.toLowerCase();

    validateSign(value);
  };

  const validateSign = (value) => {
    const lastSign = screenValue.charAt(screenValue.length - 1);
    const signs = /[+\-*/.]/;

    if (value.match(signs)) {
      if (lastSign.match(signs)) return;
    }
    setScreenValue((prevState) => `${prevState}${value}`);
  };

  return (
    <div className="calculator">
      <Result screenValue={screenValue} />
      <Keypad handleButtonClick={handleScreenDisplay} />
    </div>
  );
};

export default Calculator;
