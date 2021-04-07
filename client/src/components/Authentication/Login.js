import React, { useState } from "react";
import API from "../../utils/API";
import setAuthToken from "../../utils/setAuthToken";
import "./login.css";
import jwt_decode from "jwt-decode";
import Button from "../Button/Button"
function Login({setUser, toggle}) {

    const [formObject, setFormObject] = useState({});
    const [error, setError] = useState("")
    
// Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function onSubmit(event) {
        event.preventDefault();
        const userData = {
            email: formObject.email,
            password: formObject.password
        };
        API.loginUser(userData)
        .then(
            res => {
                const {token} = res.data;
                localStorage.setItem("jwtToken", token);
                setAuthToken(token)
                const decoded = jwt_decode(token);
                setUser(decoded)
                setError("")
                // console.log(res.data)
            }
        ).catch(err => {
            console.log(err);
            setError("Email or password is incorrect!")
        });
        }

    return(
        <div style={{
            height: 425,
            width: 375,
            margin: "50px auto 10px auto",
            textAlign: "center",
            fontFamily: "Rubik"
        }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input name="email" onChange={handleInputChange} type="email"/>
                    <label htmlFor="password">Password: </label>
                    <input name="password" onChange={handleInputChange} type="password"/>
                    {error ? <p>{error}</p> : "" }
                    <Button float={"none"} margin={"auto"} type="submit">
                        Submit
                    </Button>
                    {/* <button onClick={toggle} style={{float: "right", paddingRight: 10, marginRight: 10, fontSize: 20}}>Register?</button> */}
            </form>
            <Button onClick={toggle} float={"right"}>Register</Button>
        </div>
    )
}

export default Login;