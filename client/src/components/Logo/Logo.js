import React from "react";

import logo from "../../images/logo.jpg";

export default function Logo(props) {
  return (
    <img
      src={logo}
      alt={props.alt}
      style={{
        display: "block",
        width: props.width,
        margin: "30px auto",
        borderRadius: "200px",
      }}
    ></img>
  );
}
