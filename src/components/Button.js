import React from "react";

const Button = (props) => {
  return (
    <button
      className={
        //   add modifier to class list
        props.class ? `calculator__button ${props.class}` : "calculator__button"
      }
    >
      {props.keyValue}
    </button>
  );
};

export default Button;
