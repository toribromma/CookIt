import React from "react";

export default function Header(props) {
  return (
    <header
      style={{
        backgroundColor: props.color,
        opacity: 1,
        height: "fit-content",
        textAlign: "center",
        paddingTop: 10,
        borderBottom: "2px black solid",
        marginBottom: 10,
        boxShadow: "2px 4px 4px rgba(0,0,0,0.3)"
      }}
    >
      {props.children}
    </header>
  );
}
