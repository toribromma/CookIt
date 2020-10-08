import React, { useState } from "react";
import API from "../../utils/API";
import "./register.css";

function Register({setUser}) {

    const [formObject, setFormObject] = useState({});
// Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    function onSubmit(e) {
        e.preventDefault();
        if (formObject.name &&
            formObject.email && 
            formObject.password && 
            formObject.password2) {
        API.registerUser(formObject)
        .then(
            res => {
                setUser(res.data._id)
            }
        ).catch(err => {
            console.log(err);
        });
        // console.log(formObject)
        }
        else {
            console.log("fill it all out")
        }
    }

    return(
        <div style={{
            height: 525,
            width: 375,
            margin: "50px auto 10px auto",
            backgroundColor: "#39e6d9",
            textAlign: "center",
        }}>
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input name="name" onChange={handleInputChange} type="name"/>
                    <label htmlFor="email">Email: </label>
                    <input name="email" onChange={handleInputChange} type="email"/>
                    <label htmlFor="password">Password: </label>
                    <input name="password" onChange={handleInputChange} type="password"/>
                    <label htmlFor="password2">Confirm Password: </label>
                    <input name="password2" onChange={handleInputChange} type="password"/>
                    <button type="submit"
                    style={{
                        display: "flex",
                        margin: "10px auto auto auto"
                    }}>
                        Submit
                    </button>
            </form>
        </div>
    )
}

export default Register;