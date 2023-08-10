import React from "react";

export default function Header(props) {
  return (
    <header
      style={{
        backgroundColor: props.color,
        opacity: 1,
        height: "400px",
        borderBottom: "2px black solid",
        boxShadow: "2px 4px 4px rgba(0,0,0,0.3)",
        padding: 20,
      }}
    >
      {props.children}
    </header>
  );
}
