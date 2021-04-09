import React from "react";

export default function Button(props) {
    return(
        <button 
        style={{
            display: "block",
            backgroundColor: "#e63946",
            color: "#f1faee",
            padding: 5,
            margin: props.margin,
            fontWeight: 500,
            borderRadius: 5,
            fontSize: 15,
            border: "black solid 0.4px",
            boxShadow: "2px 2px 2px gray",
            textShadow: "1px 1px 2px gray",
            float: props.float,
            display: props.display,
            justifyContent: "center"
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}