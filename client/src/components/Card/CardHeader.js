import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        maxWidth: 200,
        margin: props.margin,
        textAlign: "center",
        fontSize: 16,
      }}
    >
      {props.children}
    </h1>
  );
}
