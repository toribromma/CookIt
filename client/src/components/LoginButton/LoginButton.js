import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import API from "../utils/API";
// import Button from "../components/Button/Button";
// import {Link, useHistory} from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


export default LoginButton;