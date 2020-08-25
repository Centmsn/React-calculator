import React from "react";

const Result = ({ screenValue, screenHistory }) => {
  return (
    <>
      <div className="calculator__screen">
        <div className="calculator__screen-history">{screenHistory}</div>
        {screenValue}
      </div>
    </>
  );
};

export default Result;
