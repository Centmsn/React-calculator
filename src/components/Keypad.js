import React from "react";
import Button from "./Button";

const Keypad = () => {
  const buttons = [
    { value: "+" },
    { value: "-" },
    { value: "*" },
    { value: "/" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "." },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "0", class: "calculator__button--round-left-border" },
    { value: "=", class: "calculator__button--equals" },
    { value: "C" },
    { value: "CE" },
    { value: "CE", class: "calculator__button--round-right-border" },
  ];
  const displayButtons = buttons.map((button) => (
    <Button key={button.value} keyValue={button.value} class={button.class} />
  ));
  return <div className="calculator__keyboard">{displayButtons}</div>;
};

export default Keypad;
