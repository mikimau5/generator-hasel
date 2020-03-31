import React from "react";

const Result = props => {
  return (
    <div className="result" onClick={props.click}>
      <p>{props.password}</p>
    </div>
  );
};

export default Result;
