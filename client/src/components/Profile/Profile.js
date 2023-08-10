import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div style={{ textAlign: "center" }}>
        <h1>
          Welcome,
          <br></br>
          {user.name}
        </h1>
        <img
          style={{
            borderRadius: "200px",
            width: 150
          }}
          src={user.picture}
          alt={user.name}
        />
      </div>
    )
  );
};

export default Profile;
