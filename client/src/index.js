import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-5eih8jsgesnh34xg.us.auth0.com"
    clientId="4hwkIBm2gl3lrHyCd8GZDh7V0UWpXwOg"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/main"
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

