import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: "https://safe-refuge-86821-87fdcaa8ddcc.herokuapp.com" } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;