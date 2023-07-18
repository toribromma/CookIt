import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    isAuthenticated && (
      <div>
        <img style={{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "50%",
        // minWidth: 180
      }} src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;