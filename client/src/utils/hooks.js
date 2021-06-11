import jwt_decode from "jwt-decode";

export function checkJwtoken(loadRecipes) {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const decoded = jwt_decode(token);

    loadRecipes(decoded.id);
  }
}
