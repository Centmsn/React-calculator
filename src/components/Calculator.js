import React, { useState } from "react";
import Result from "./Result";
import Keypad from "./Keypad";
import "../css/calculator.css";

const Calculator = () => {
  const [screenValue, setScreenValue] = useState("");
  const [screenHistory, setScreenHistory] = useState("");
  // flag for replacing numbers in screen
  const [shouldEvaluate, setShouldEvaluate] = useState(false);

  const handleScreenDisplay = (e) => {
    const value = e.target.textContent.toLowerCase();
    validateSign(value);
  };

  const calculateResult = (value, screenValue, screenHistory) => {
    if ((value, screenValue, screenHistory)) {
      setShouldEvaluate((prevState) => !prevState);
      return eval(`${screenHistory}${screenValue}`).toString();
    } else {
      return "";
    }
  };

  const validateSign = (value) => {
    const lastSign = screenValue.charAt(screenValue.length - 1);
    const signs = /[+\-*/.]/;
    const numbers = /[0-9]/;
    // if value is a symbol or number
    if (value.match(signs) || value.match(numbers)) {
      if (value.match(numbers) && shouldEvaluate) {
        setShouldEvaluate((prevState) => !prevState);
        setScreenValue(value);
        return;
      }
      // if value is a symbol
      if (value.match(signs)) {
        // if last sign is also symbol
        if (lastSign.match(signs)) return;
        // if input is empty
        if (screenValue.length === 0) return;
        setScreenHistory((prevState) => `${prevState}${screenValue}${value}`);
        setScreenValue(calculateResult(value, screenValue, screenHistory));
        return;
      }
      setScreenValue((prevState) => `${prevState}${value}`);
    }
    //dont eval if length <= 0
    // dont eval if no history
    if (value === "=" && screenValue.length > 0) {
      if (lastSign.match(signs)) return;
      //last sign is a symbol not number
      setScreenHistory((prevState) => `${prevState}${value}=`);
      setScreenValue((prevState) => eval(prevState).toString());
    }
    if (value === "back") {
      setScreenValue((prevState) => prevState.slice(0, -1)); //if back remove last sign
    }
    if (value === "c") {
      setScreenValue("");
      setScreenHistory("");
      setShouldEvaluate(false);
    }
    if (value === "ce") {
      setScreenValue("");
    }
  };

  return (
    <div className="calculator">
      <Result screenValue={screenValue} screenHistory={screenHistory} />
      <Keypad handleButtonClick={handleScreenDisplay} />
    </div>
  );
};

export default Calculator;
