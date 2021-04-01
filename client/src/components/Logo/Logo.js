import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Logo(props) {
    return(
        <LazyLoadImage 
        src={props.logo} 
        alt={props.alt}
        style={{
            width: "250px",
            height: "250px",
            borderRadius: 5,
            margin: 20
        }}
        ></LazyLoadImage>
    )
}