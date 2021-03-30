import React from "react";

export default function CardButton(props, clickToggleButton) {
    return(
        <button onClick={clickToggleButton}
        style={{
            display: "inline-block",
            backgroundColor: "#e63946",
            color: "#f1faee",
            border: "transparent",
            padding: 10,
            margin: 10,
            fontWeight: 600,
            borderRadius: 5,
            fontSize: 25,
            border: "black solid 0.2px",
            textShadow: "1px 1px 2px gray"
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}