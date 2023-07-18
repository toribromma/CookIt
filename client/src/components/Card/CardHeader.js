import React from "react";

export default function CardHeader(props) {
  return (
    <h1
      style={{
        width: 200,
        margin: "auto",
        fontSize: 16,
      }}
    >
      {props.children}
    </h1>
  );
}
