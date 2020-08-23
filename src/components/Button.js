import React from "react";

const Button = ({ keyValue, classValue, click }) => {
  return (
    <button
      className={
        //   add modifier to class list
        classValue ? `calculator__button ${classValue}` : "calculator__button"
      }
      onClick={click}
    >
      {keyValue}
    </button>
  );
};

export default Button;
