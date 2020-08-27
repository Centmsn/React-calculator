import React, { useState } from "react";
import Result from "./Result";
import Keypad from "./Keypad";
import Logic from "./logic";
import "../css/calculator.css";

const Calculator = () => {
  const [screenValue, setScreenValue] = useState("");
  const [screenHistory, setScreenHistory] = useState("");
  // flag for replacing screen value instead of adding value
  const [resetScreen, setResetScreen] = useState(false);
  // flag for replacing screen history after using = and then number
  const [resetHistory, setResetHistory] = useState(false);

  const getKeyValue = (e) => {
    const value = e.target.textContent.toLowerCase();

    // clear all
    if (value === "c") {
      setScreenValue("");
      setScreenHistory("");
      Logic.setResult("reset");
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
      // if (screenValue.length === 0) return;
      if (Logic.validateSign(value, screenValue, screenHistory) === "notAdd")
        return;
      setScreenValue(Logic.countResult(screenValue, screenHistory));
      setScreenHistory((prevState) =>
        Logic.setScreenHistory(value, prevState, screenValue)
      );
      setResetScreen(true);
      setResetHistory(true);
      return;
    }

    // check if can be used
    if (
      Logic.validateSign(value, screenValue, screenHistory, resetScreen) ===
      "addNum"
    ) {
      // if its number

      if (
        Logic.getResult() === "Do not divide by 0" ||
        Logic.getResult() === "Unknown result"
      ) {
        setResetScreen(true);
        setScreenHistory("");
        Logic.setResult("reset");
      }

      resetScreen
        ? // if reset flag is active
          setScreenValue(value)
        : setScreenValue((prevState) => Logic.setScreenValue(value, prevState));

      resetHistory && setScreenHistory("");
      resetHistory && Logic.setResult("reset");
      // reset flags
      setResetHistory(false);
      setResetScreen(false);
    } else if (
      Logic.validateSign(value, screenValue, screenHistory) === "addSign"
    ) {
      // if its sign

      setScreenHistory((prevState) =>
        Logic.setScreenHistory(value, prevState, screenValue)
      );
      setScreenValue(Logic.countResult(screenValue, screenHistory));
      // after setting history screen value will be cleared
      setResetScreen(true);
      // if last sign in history is on operator replace it
    } else if (
      Logic.validateSign(value, screenValue, screenHistory) === "replaceSign"
    ) {
      setScreenHistory((prevState) => Logic.setScreenHistory(value, prevState));

      // do not reset history if = was replaced
      setResetHistory(false);
    }
  };

  return (
    <div className="calculator">
      <Result screenValue={screenValue} screenHistory={screenHistory} />
      <Keypad handleButtonClick={getKeyValue} />
    </div>
  );
};

export default Calculator;
