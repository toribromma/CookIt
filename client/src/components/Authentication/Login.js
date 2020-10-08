import React, { useState } from "react";
import API from "../../utils/API";
import "./login.css";

function Login({setUser}) {

    const [formObject, setFormObject] = useState({});
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
            setUser(res.data._id)
            // console.log(res.data)
        }
    ).catch(err => {
        console.log(err);
    });
    }

    return(
        <div style={{
            height: 425,
            width: 375,
            margin: "50px auto 10px auto",
            backgroundColor: "#39e6d9",
            textAlign: "center",
            borderRadius: 10
        }}>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input name="email" onChange={handleInputChange} type="email"/>
                    <label htmlFor="password">Password: </label>
                    <input name="password" onChange={handleInputChange} type="password"/>
                    <button type="submit">
                        Submit
                    </button>
            </form>
        </div>
    )
}

export default Login;