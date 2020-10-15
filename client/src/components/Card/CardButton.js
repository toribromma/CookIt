import React from "react";

export default function CardButton(props) {
    return(
        <button
        style={{
            backgroundColor: "#e63946",
            color: "#f1faee",
            border: "transparent",
            padding: 10,
            fontWeight: 500,
            borderRadius: 5
        }}
        {...props} >
            {props.children}
        </button>
    )
}