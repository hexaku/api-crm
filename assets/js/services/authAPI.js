import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API } from '../config';


// Déconnexion (suppression du token du localStorage sur Axios)
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

// Requête HTTP d'authentification et stockage du token dans le storage et sur axios
function authenticate(credentials) {
  return axios
  .post(LOGIN_API, credentials)
  .then(response => response.data.token)
  .then(token => {
    // Je stocke le token dans le local storage
    window.localStorage.setItem("authToken", token);
  
    // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
    setAxiosToken(token);

    return true;
  });
}

// Positionne le otken JWT sur Axios
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

// Mis en place lors du chargement de l'application 
function setup() {
  const token = window.localStorage.getItem("authToken");
  if(token){
    const { exp } = jwtDecode(token)
    if(exp * 1000 > new Date().getTime()){
      setAxiosToken(token);
    }
  }
}

// Permet de savoir si on est authentifié ou non
/**
 * @returns boolean
 */
function isAuthenticated() {
  const token = window.localStorage.getItem("authToken");
  if(token){
    const { exp } = jwtDecode(token)
    if(exp * 1000 > new Date().getTime()){
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated
}

