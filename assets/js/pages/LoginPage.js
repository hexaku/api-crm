import React, { Fragment, useState } from 'react'

const LoginPage = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    setCredentials({...credentials, [name]: value})
  }

  const handleSubmit = event => {
    event.preventDefault();

    console.log(credentials);
  }


  return (
    <Fragment>
      <h1>Connexion à l'application</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Adresse email</label>
          <input 
          value={credentials.username}
          onChange={handleChange}
          className="form-control"
          type="email"
          placeholder="Adresse email de connexion"
          name="username"
          id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
          value={credentials.password}
          onChange={handleChange}
          className="form-control"
          type="password"
          placeholder="Mot de passe"
          name="password"
          id="password"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Connexion</button>
        </div>
      </form>
    </Fragment>
  )
}

export default LoginPage;
