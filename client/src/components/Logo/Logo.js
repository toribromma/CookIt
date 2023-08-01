import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Logo(props) {
    return(
        <LazyLoadImage 
        src={props.logo} 
        alt={props.alt}
        style={{
            maxWidth:"100px",
            height: "auto",
            margin: "30px auto",
            borderRadius: "200px",
            gridColumnStart: 4
        }}
        ></LazyLoadImage>
    )
}