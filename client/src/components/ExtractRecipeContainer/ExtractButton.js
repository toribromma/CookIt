import React from "react";

export default function ExtractButton(props) {
    return(
            <button
            style={{
                backgroundColor: "#e63946",
                color: "#f1faee",
                border: "transparent",
                padding: 10,
                fontWeight: 700,
                borderRadius: 5,
                cursor: "pointer"
            }}
            
            {...props}
            >
                {props.children}
            </button>
    )

}