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
            width: props.width,
            borderRadius: 50,
            fontSize: props.fontSize,
            border: "black solid 2px",
            boxShadow: "2px 2px 2px gray",
            float: props.float,
            display: props.display,
            justifyContent: "center",
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}