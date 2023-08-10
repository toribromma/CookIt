import React from "react"

export default function TextArea(props) {
    return(
        <textarea style={{
            margin: props.margin,
            width: "320px",
            textAlign: "center",
            resize: "none",
            height: 150,
            padding: "12px 20px",
            boxSizing: "border-box",
            border: "2px solid #e63946",
            boxShadow: "2px 4px 4px rgba(0,0,0,0.3)",

            
        }}
        {...props}
        >
            {props.children}
        </textarea>
    )
}