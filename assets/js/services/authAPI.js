import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
    setAxiosToken(token);

    return true;
  });
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
  const token = window.localStorage.getItem("authToken");
  if(token){
    const { exp } = jwtDecode(token)
    if(exp * 1000 > new Date().getTime()){
      setAxiosToken(token);
    }
  }
}

export default {
  authenticate,
  logout,
  setup
}

