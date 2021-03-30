import React from "react";

export default function ExtractButton(props) {
    return(
            <button
            style={{
                backgroundColor: "#e63946",
                color: "#f1faee",
                border: "transparent",
                padding: "auto",
                fontWeight: 500,
                borderRadius: 5,
                cursor: "pointer",
                margin: "20px auto 10px auto",
                width: 300,
                fontSize: 25
                
            }}
            
            {...props}
            >
                {props.children}
            </button>
    )

}