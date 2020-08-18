import React, { Component } from "react";
import Result from "./Result";
import Keypad from "./Keypad";
import "../css/calculator.min.css";

class Calculator extends Component {
  state = {};
  render() {
    return (
      <div className="calculator">
        <Result />
        <Keypad />
      </div>
    );
  }
}

export default Calculator;
