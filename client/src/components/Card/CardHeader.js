import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        maxHeight: 220,
        width: 200,
        textAlign: "center",
        margin: "auto",
        fontSize: 20,
      }}
    >
      {props.children}
    </h1>
  );
}
