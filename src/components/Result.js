import React from "react";

const Result = ({ screenValue }) => {
  return (
    <>
      <div className="calculator__screen">
        <div className="calculator__screen-history">10*10-150-4214</div>
        {screenValue}
      </div>
    </>
  );
};

export default Result;
