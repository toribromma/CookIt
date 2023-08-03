import React from "react";

export default function Header(props) {
  return (
    <header
      style={{
        backgroundColor: props.color,
        opacity: 1,
        height: "400px",
        width: "auto",
        borderBottom: "2px black solid",
        boxShadow: "2px 4px 4px rgba(0,0,0,0.3)",
        display: "grid",
        gridTemplateColumns: "1fr repeat(3,auto) 1fr"
        
      }}
    >
      {props.children}
    </header>
  );
}
