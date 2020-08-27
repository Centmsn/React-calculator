import React from "react";
import Logic from "./logic";

const Result = ({ screenValue, screenHistory }) => {
  return (
    <>
      <div
        className={
          Logic.getResult() === "Do not divide by 0" ||
          Logic.getResult() === "Unknown result"
            ? "calculator__screen calculator__screen--disabled"
            : "calculator__screen"
        }
      >
        <div className="calculator__screen-history">{screenHistory}</div>
        {screenValue}
      </div>
    </>
  );
};

export default Result;
