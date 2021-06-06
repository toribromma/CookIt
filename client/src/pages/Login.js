import React, { useState } from "react";
import API from "../utils/API";
import setAuthToken from "../utils/setAuthToken";
import Button from "../components/Button/Button";
import {Link, useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = ({setUserId}) => {
  const [formObject, setFormObject] = useState({});
  const [error, setError] = useState("");
  
  let history = useHistory();

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function onSubmit(event) {
    event.preventDefault();
    const userData = {
      email: formObject.email,
      password: formObject.password,
    };
    API.loginUser(userData)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        setError("");
        const decoded = jwt_decode(localStorage.jwtToken);
        console.log(decoded.id);
        setUserId(decoded.id);
        history.push("/main");
      })
      .catch((err) => {
        console.log(err);
        setError("Email or password is incorrect!");
      });
  }
  

  return (
    
    <div
      style={{
        height: 425,
        width: 375,
        margin: "50px auto 10px auto",
        textAlign: "center",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email: </label>
        <input name="email" onChange={handleInputChange} type="email" />
        <label htmlFor="password">Password: </label>
        <input
          style={{ display: "block", margin: "auto" }}
          name="password"
          onChange={handleInputChange}
          type="password"
        />
        {error ? <p>{error}</p> : ""}
        <Button
          display="inline-block"
          float={"none"}
          margin={"10px 4px"}
          type="submit"
        >
          Submit
        </Button>
        <br></br>
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

export default Login;
