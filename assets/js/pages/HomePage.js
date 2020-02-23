import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Bienvenue sur API-CRM</h1>
      <p className="lead">API-CRM vous permet de gérer vos clients et leurs factures très simplement sur une interface minimaliste, sécurisée et performante.</p>
      <hr className="my-4"/>
      <p>Pour débuter, commencez par vous inscrire !</p>
      <p className="lead">
        <Link className="btn btn-info btn-lg" to="/register" role="button">Je m'inscris !</Link>
      </p>
    </div>
  )
}

export default HomePage
