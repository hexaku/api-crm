import axios from 'axios';

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return axios
  .post("http://127.0.0.1:8000/api/login_check", credentials)
  .then(response => response.data.token)
  .then(token => {
    // Je stocke le token dans le local storage
    window.localStorage.setItem("authToken", token);
  
    // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
    axios.defaults.headers["Authorization"] = "Bearer " + token;

    return true;
  });
  
}

export default {
  authenticate,
  logout
}

