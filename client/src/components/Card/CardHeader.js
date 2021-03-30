import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        height: "max-height",
        width: 370,
        textAlign: "center",
        margin: "auto",
        fontSize: 50
      }}
    >
      {props.children}
    </h1>
  ); 
}
