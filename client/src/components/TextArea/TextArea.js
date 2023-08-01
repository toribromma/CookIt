import React from "react"

export default function TextArea(props) {
    return(
        <textarea style={{
            margin: props.margin,
            width: "320px",
            textAlign: "center"
            
        }}
        {...props}
        >
            {props.children}
        </textarea>
    )
}