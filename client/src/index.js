import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-5eih8jsgesnh34xg.us.auth0.com"
    clientId="4hwkIBm2gl3lrHyCd8GZDh7V0UWpXwOg"
    authorizationParams={{
      redirect_uri: "https://recipeapp90-573cb14b2d02.herokuapp.com/main"
    }}
  >
    <App />
  </Auth0Provider>,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
