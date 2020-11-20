import React from "react";

export default function CardButton(props) {
    return(
        <button
        style={{
            display: "inline-block",
            backgroundColor: "#e63946",
            color: "#f1faee",
            border: "transparent",
            padding: 5,
            margin: 5,
            fontWeight: 500,
            borderRadius: 5
        }}
        {...props} >
            {props.children}
        </button>
    )
}