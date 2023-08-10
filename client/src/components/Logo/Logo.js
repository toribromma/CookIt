import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from "../../images/logo.jpg";

export default function Logo(props) {
    return(
        <LazyLoadImage 
        src={logo} 
        alt={props.alt}
        style={{
            display: "block",
            width: props.width,
            margin: "30px auto",
            borderRadius: "200px",
        }}
        ></LazyLoadImage>
    )
}