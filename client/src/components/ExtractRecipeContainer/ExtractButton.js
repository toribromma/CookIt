import React from "react";

export default function ExtractButton(props) {
    return(
            <button
            style={{
                backgroundColor: "#e63946",
                color: "#f1faee",
                border: "black solid 0.4px",
                padding: "auto",
                fontWeight: 500,
                borderRadius: 5,
                cursor: "pointer",
                margin: "20px auto 10px auto",
                width: 300,
                fontSize: 25,
                boxShadow: "2px 2px 2px gray",
                textShadow: "1px 1px 2px gray"
                
            }}
            
            {...props}
            >
                {props.children}
            </button>
    )

}