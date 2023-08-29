import React from "react";
import "./style.css"

export default function Button(props) {
  return (
    <button className="button" id="button"
      style={{
        // margin: props.margin,
        width: props.width,
        height: props.height,
        float: props.float,
        display: "block",
      }}
      {...props}
    >
      {props.children}
    </button>
  );
}
