import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CardImage(props) {
    return(
        <LazyLoadImage 
        src={props.cardImage} 
        placeholder={<div>No pic</div>}
        alt={props.alt}
        height={150}
        width={150}
        style={{
            objectFit: "cover",
            borderRadius: "50%",
            margin: "10px auto",
            display: "block",
            opacity: 1,
            position: "relative",
            top: -5,
        }}
        ></LazyLoadImage>
    )
}