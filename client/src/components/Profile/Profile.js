import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  
  return (
    isAuthenticated && (
      <div
        style={{
          marginLeft: "auto",
          padding: 10,
        }}
      >
        <div>
          Welcome,
          <br></br>
          {user.name}
        </div>
        <img
          style={{
            borderRadius: "200px",
            marginTop: 10,
            width: 50,
            float: "right"
          }}
          src={user.picture}
          alt={user.name}
        />
        {/* <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};

export default Profile;
