import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';


export default function CardImage(props) {
    return(
        <LazyLoadImage 
        src={props.cardImage} 
        alt={props.alt}
        height={250}
        width={250}
        style={{
            objectFit: "cover",
            borderRadius: "50%",
            margin: "auto",
            display: "block",
            opacity: 1,
            position: "relative",
            top: -25,
        }}
        ></LazyLoadImage>
    )
}