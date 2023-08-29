import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        maxWidth: 320,
        margin: props.margin,
        textAlign: "center",
        fontSize: 32,
      }}
    >
      {props.children}
    </h1>
  );
}
