import React from "react";

export default function ExtractButton(props) {
  return (
    <button
      style={{
        display: "flex",
        backgroundColor: "#e63946",
        color: "#f1faee",
        border: "black solid 0.4px",
        padding: "10px",
        fontWeight: 500,
        borderRadius: 5,
        cursor: "pointer",
        margin: "auto",
        width: 300,
        fontSize: 25,
        boxShadow: "3px 4px 3px rgba(0,0,0,0.3)",
        textShadow: "2px 4px 3px rgba(0,0,0,0.3)",
        justifyContent: "center"
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
