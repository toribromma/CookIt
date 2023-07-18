import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";
// import API from "../utils/API";
// import Button from "../components/Button/Button";
// import {Link, useHistory} from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button display="block" margin="20px auto" onClick={() => loginWithRedirect()}>Log In</Button>;
};


export default LoginButton;