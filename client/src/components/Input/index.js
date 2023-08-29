import React from "react";
import "./style.css"
const Input = (props) => {
  return (
    <div>
      <h2
        style={{
          color: "black",
          fontSize: 32
        }}
      >
        {props.header}
      </h2>
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleInputChange}
        {...props}
        style={{
          margin: props.margin,
        }}
      ></input>
    </div>
  );
};

export default Input;
