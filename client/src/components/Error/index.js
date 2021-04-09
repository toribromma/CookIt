import React from "react";

const Error = (props) => {
  return (
    <div
      style={{
        display: "block",
        margin: "10px auto",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 20,
        color: "black",
        textShadow: "2px 2px 2px red"
      }}
    >
      {props.error}
    </div>
  );
};

export default Error;
