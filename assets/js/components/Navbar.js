import React from 'react'
import AuthAPI from '../services/authAPI';
import authAPI from '../services/authAPI';

const handleLogout = () => {
  authAPI.logout();
}

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="#">SymReact !</a>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Clients</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Factures</a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mx-1">
            <a href="#" className="nav-link">
              Inscription
            </a>
          </li>
          <li className="nav-item mx-1">
            <a href="#" className="btn btn-success">
              Connexion !
            </a>
          </li>
          <li className="nav-item mx-1">
            <button 
            className="btn btn-danger"
            onClick={handleLogout}
            >
              Déconnexion
            </button>
          </li>
        </ul>

      </div>
    </nav>
  )
}

export default Navbar;
