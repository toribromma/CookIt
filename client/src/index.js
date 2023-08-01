import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: "https://safe-refuge-86821-87fdcaa8ddcc.herokuapp.com/main"
      // redirect_uri: "http://localhost:3000/main",
      // audience: "recipes",
      // scope: "openid read:current_user update:current_user_metadata"
    }}
    // onRedirectCallback={onRedirectCallback}
    // useRefreshTokens={true}
    // cacheLocation="localstorage"
  >
      <AlertProvider template={AlertTemplate} {...options}>
    <App />
      </AlertProvider>

  </Auth0Provider>,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
