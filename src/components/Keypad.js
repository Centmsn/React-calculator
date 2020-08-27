import React from "react";
import Button from "./Button";

const Keypad = ({ handleButtonClick, disabled }) => {
  const buttons = [
    { value: "+", class: "calculator__button--sign", name: "actionBtn" },
    { value: "-", class: "calculator__button--sign", name: "actionBtn" },
    { value: "*", class: "calculator__button--sign", name: "actionBtn" },
    { value: "/", class: "calculator__button--sign", name: "actionBtn" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: ".", class: "calculator__button--sign", name: "actionBtn" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    {
      value: "0",
      class: "calculator__button--round-left-border",
    },
    { value: "=", class: "calculator__button--equals", name: "actionBtn" },
    { value: "C", class: "calculator__button--sign", name: "actionBtn" },
    { value: "CE", class: "calculator__button--sign", name: "actionBtn" },
    {
      value: "back",
      class: "calculator__button--sign calculator__button--round-right-border",
      name: "actionBtn",
    },
  ];
  const displayButtons = buttons.map((button) => (
    <Button
      key={button.value}
      keyValue={button.value}
      classValue={button.class}
      click={handleButtonClick}
      name={button.name}
    />
  ));
  return <div className="calculator__keyboard">{displayButtons}</div>;
};

export default Keypad;
