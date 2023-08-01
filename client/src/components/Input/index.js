import React from "react";

const Input = (props) => {
  return (
    <div>
      <h2
        style={{
          // textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
          color: "black"
        }}
      >{props.header}</h2>
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleInputChange}
        {...props}
        style={{
          display: "flex",
          maxWidthwidth: "320px",
          height: "25px",
          margin: "auto",
          borderRadius: 10,
          padding: 20,
          border: "black 1.5px solid",
          textAlign: "center",  
          boxShadow: "2px 4px 4px rgba(0,0,0,0.3)"
        }}
      ></input>
    </div>
  );
};

export default Input;
