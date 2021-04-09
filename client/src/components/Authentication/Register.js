import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../utils/API";
import Button from "../Button/Button";

function Register({ setUser, toggle }) {
  const { register, errors, handleSubmit, watch } = useForm();
  const [formObject, setFormObject] = useState({});

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  function onSubmit() {
    // e.preventDefault();

    if (
      formObject.name &&
      formObject.email &&
      formObject.password &&
      formObject.password2
    ) {
      API.registerUser(formObject)
        .then((res) => {
          setUser(res.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(formObject)
    } else {
      console.log("fill it all out");
    }
  }

  return (
    <div
      style={{
        height: 525,
        width: 375,
        margin: "50px auto 10px auto",
        textAlign: "center",
      }}
    >
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name: </label>
        <input
          ref={register({ required: true, maxLength: 40 })}
          name="name"
          onChange={handleInputChange}
          type="name"
        />
        <div>{errors.name && "Name is required"}</div>
        <label htmlFor="email">Email: </label>
        <input
          ref={register({
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          })}
          name="email"
          onChange={handleInputChange}
        />
        <div>{errors.email && "Email is required"}</div>
        <label htmlFor="password">Password: </label>
        <input
          ref={register({ required: true, minLength: 8 })}
          name="password"
          onChange={handleInputChange}
          type="password"
        />
        <div>
          {errors.password && "Password must be at least 8 characters!"}
        </div>
        <label htmlFor="password2">Confirm Password: </label>
        <input
          ref={register({
            validate: (value) => {
              return value === watch("password");
            },
          })}
          name="password2"
          onChange={handleInputChange}
          type="password"
        />
        <div>{errors.password2 && "Passwords must match"}</div>
        <Button type="submit" float="none" margin={5}>
          Submit
        </Button>
        <Button display={"block"} onClick={toggle} float="none" margin={"auto"}>
          Click Here To Login
        </Button>
      </form>
    </div>
  );
}

export default Register;
