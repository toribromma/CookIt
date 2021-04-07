import React from "react";

export default function Button(props) {
    return(
        <button 
        style={{
            backgroundColor: "#e63946",
            color: "#f1faee",
            padding: 10,
            margin: props.margin,
            fontWeight: 500,
            borderRadius: 5,
            fontSize: 25,
            border: "black solid 0.4px",
            boxShadow: "2px 2px 2px gray",
            textShadow: "1px 1px 2px gray",
            float: props.float
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}