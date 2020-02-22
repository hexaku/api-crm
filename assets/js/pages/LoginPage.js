import React, { Fragment, useState, useContext } from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';

const LoginPage = ({ history }) => {

  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ target }) => {
    const {value, name} = target;

    setCredentials({...credentials, [name]: value})
  };

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      history.replace("/customers");
    } catch(error) {
      setError("Identifiants incorrects");
    }
  };


  return (
    <Fragment>
      <h1>Connexion à l'application</h1>
      <form onSubmit={handleSubmit}>
        <Field 
          label="Adresse email"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          error={error}
        />
        <Field 
          label="Mot de passe"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          error={error}
          type="password"
        />
        <div className="form-group">
          <button className="btn btn-success">Connexion</button>
          <Link to="/register" className="btn btn-link">Pas de compte ? S'inscrire</Link>
        </div>
      </form>
    </Fragment>
  )
}

export default LoginPage;
