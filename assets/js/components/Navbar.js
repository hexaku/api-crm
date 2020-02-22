import React, { useContext } from 'react'
import authAPI from '../services/authAPI';
import { NavLink } from 'react-router-dom';
import '../../css/Navbar.css';
import AuthContext from '../contexts/AuthContext';

const Navbar = ({ history}) => {

  const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    history.push("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">API-CRM</NavLink>
      <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="navbar-collapse collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">Clients</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {
          isAuthenticated ? 
          <li className="nav-item mx-1">
            <button 
            className="btn btn-danger"
            onClick={handleLogout}
            >
              Déconnexion
            </button>
          </li>
          :
          <div className="flex-button">
          <li className="nav-item mx-1">
            <NavLink to="/register" className="btn btn-info">
              Inscription
            </NavLink>
          </li>
          <li className="nav-item mx-1">
            <NavLink to="/login" className="btn btn-success">
              Connexion !
            </NavLink>
          </li>
          </div>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
