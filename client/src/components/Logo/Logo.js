import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Logo(props) {
    return(
        <LazyLoadImage 
        src={props.logo} 
        alt={props.alt}
        style={{
            maxWidth:"250px",
            height: "auto",
            margin: 50,
            borderRadius: "200px"
        }}
        ></LazyLoadImage>
    )
}