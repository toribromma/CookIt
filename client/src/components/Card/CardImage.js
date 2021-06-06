import React from "react"
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function CardImage(props) {
    return(
        <LazyLoadImage 
        src={props.cardImage} 
        // srcset="small.jpg 480w, large.jpg 800w"
        sizes="(max-width: 480px) 80vw, (max-width: 1024px) 50vw, 800px"
        placeholder={<div>No pic</div>}
        alt={props.alt}
        height={150}
        width={150}
        style={{
            objectFit: "cover",
            borderRadius: "50%",
            margin: "auto",
            display: "block",
            opacity: 1,
            position: "relative",
            top: -5,
        }}
        ></LazyLoadImage>
    )
}