import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        height: "fit-content",
        width: 170,
        textAlign: "center",
        margin: "auto",
        // fontSize: 0,
      }}
    >
      {props.children}
    </h1>
  );
}
