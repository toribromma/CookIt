import React from "react";

export default function ExtractButton(props) {
    return(
            <button
            style={{
                backgroundColor: "#e63946",
                color: "#f1faee",
                border: "transparent",
                padding: 10,
                fontWeight: 500,
                borderRadius: 5,
                cursor: "pointer",
                margin: "50px auto 50px auto"
            }}
            
            {...props}
            >
                {props.children}
            </button>
    )

}