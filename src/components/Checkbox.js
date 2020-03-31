import React from "react";

const Form = props => {
  return (
    <li>
      <input
        type="checkbox"
        key={props.id}
        checked={props.isChecked}
        value={props.value}
        onChange={props.handleChecked}
        id={props.value}
      />
      <label htmlFor={props.value}>{props.value}</label>
    </li>
  );
};

export default Form;
