import React from "react";
import "./style.css";

export default function Header(props) {
  return (
    <header
      style={{
        backgroundColor: props.color,
        opacity: 1,
        height: "fit-content",
        textAlign: "center",
        paddingTop: 10,
      }}
    >
      {props.children}
    </header>
  );
}
