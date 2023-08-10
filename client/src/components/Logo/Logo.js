import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Logo(props) {
    return(
        <LazyLoadImage 
        src={props.logo} 
        alt={props.alt}
        style={{
            display: "block",
            width: 200,
            margin: "0 auto",
            borderRadius: "200px",
        }}
        ></LazyLoadImage>
    )
}