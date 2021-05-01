import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        height: "100px",
        width: 370,
        textAlign: "center",
        margin: "auto",
        // fontSize: 0,
      }}
    >
      {props.children}
    </h1>
  );
}
