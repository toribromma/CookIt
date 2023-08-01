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
            height: props.height,
            borderRadius: 50,
            fontSize: props.fontSize,
            border: "black solid 1.2px",
            boxShadow: "2px 4px 4px rgba(0,0,0,0.3)",
            float: props.float,
            display: props.display,
            
            // justifyContent: "center",
            
        }}
        {...props} >
            {props.children}
        </button>
    )
}