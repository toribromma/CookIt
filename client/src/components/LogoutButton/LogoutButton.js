import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ logoutParams: 
    { returnTo: "https://safe-refuge-86821-87fdcaa8ddcc.herokuapp.com" } })}
    // { returnTo: "http://localhost:3000/" } })}
  
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;