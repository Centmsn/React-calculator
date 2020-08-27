import React from "react";
import Logic from "./logic";

const Button = ({ keyValue, classValue, name, click }) => {
  return (
    <button
      className={
        //   add modifier to class list
        classValue ? `calculator__button ${classValue}` : "calculator__button"
      }
      onClick={click}
      disabled={
        Logic.getResult() === "Do not divide by 0" && name === "actionBtn"
          ? true
          : false
      }
    >
      {keyValue}
    </button>
  );
};

export default Button;
