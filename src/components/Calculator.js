import React, { useState } from "react";
import Result from "./Result";
import Keypad from "./Keypad";
import Logic from "./logic";
import "../css/calculator.css";

const Calculator = () => {
  const [screenValue, setScreenValue] = useState("");
  const [screenHistory, setScreenHistory] = useState("");

  // const [operator, setOperator] = useState("");

  const getKeyValue = (e) => {
    const value = e.target.textContent.toLowerCase();

    // clear all
    if (value === "c") {
      setScreenValue("");
      setScreenHistory("");
      return;
    }

    // clear last
    if (value === "ce") {
      setScreenValue("");
      return;
    }

    // clear last sign
    if (value === "back") {
      setScreenValue((prevState) => prevState.slice(0, -1));
      return;
    }

    // show result
    if (value === "=") {
      setScreenValue(Logic.countResult(screenHistory, screenValue));
      setScreenHistory((prevState) =>
        Logic.setScreenHistory(value, prevState, screenValue)
      );
      return;
    }

    // check if can be used
    if (Logic.validateSign(value, screenValue, screenHistory) === "addNum") {
      // if its number
      setScreenValue((prevState) => Logic.setScreenValue(value, prevState));
    } else if (
      Logic.validateSign(value, screenValue, screenHistory) === "addSign"
    ) {
      // if its sign
      setScreenHistory((prevState) =>
        Logic.setScreenHistory(value, prevState, screenValue)
      );
      // if last sign in history is on operator replace it
    } else if (
      Logic.validateSign(value, screenValue, screenHistory) === "replaceSign"
    ) {
      setScreenHistory((prevState) => Logic.replaceLastSign(value, prevState));
    }
  };

  // const calculateResult = (value, screenValue, screenHistory) => {
  //   if ((value, screenValue, screenHistory)) {
  //     if (value === "=") {
  //       setShouldEvaluate(false);
  //     } else {
  //       setShouldEvaluate((prevState) => !prevState);
  //     }
  //     return eval(`${screenHistory}${screenValue}`).toString();
  //   } else {
  //     return "";
  //   }
  // };

  // const validateSign = (value) => {
  //   const lastSign = screenHistory.charAt(screenHistory.length - 1);
  //   const signs = /[+\-*/.=]/;
  //   const numbers = /[0-9]/;
  //   // if value is a symbol or number
  //   if (value.match(signs) || value.match(numbers)) {
  //     if (value.match(numbers) && shouldEvaluate) {
  //       if (equalsFlag) {
  //         setScreenHistory("");
  //         setScreenValue(value);
  //         setEquals(false);
  //       }
  //       setShouldEvaluate((prevState) => !prevState);
  //       setScreenValue(value);
  //       return;
  //     }
  //     // if value is a symbol
  //     if (value.match(signs)) {
  //       if (equalsFlag) {
  //         setScreenHistory("");
  //         setScreenValue(value);
  //         setEquals(false);
  //       }
  //       if (screenValue.length === 0) return;
  //       if (value === "=") {
  //         setScreenHistory((prevState) => `${prevState}${screenValue}`);
  //         setEquals(true);
  //       } else {
  //         setScreenHistory((prevState) => `${prevState}${screenValue}${value}`);
  //       }
  //       setScreenValue(calculateResult(value, screenValue, screenHistory));
  //       return;
  //     }
  //     setScreenValue((prevState) => `${prevState}${value}`);
  //   }

  return (
    <div className="calculator">
      <Result screenValue={screenValue} screenHistory={screenHistory} />
      <Keypad handleButtonClick={getKeyValue} />
    </div>
  );
};

export default Calculator;
