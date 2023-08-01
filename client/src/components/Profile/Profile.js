import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-5eih8jsgesnh34xg.us.auth0.com";
  
  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user update:current_user_metadata"
  //         },
  //       });
  
  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });
      
  //       const { user_metadata } = await metadataResponse.json();
  //       // console.log({user_metadata})
  
  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };
  
  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

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
            marginTop: 10
            // width: 50,
            // float: "right"
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
