import React from "react";
import "./style.css";

export default function Card(props, clickToggleButton) {
  return (
    <div
      className="card"
    //   style={{
    //     backgroundColor: props.color,
    //     height: "fit-content",
    //     // width: "max-width",
    //     border: props.border,
    //     borderRadius: 5,
    //     padding: 10,
    //     margin: "2px",
    //   }}
    >
      {props.children}
    </div>
  );
}
