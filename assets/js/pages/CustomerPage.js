import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import CustomersAPI from '../services/customersAPI';

const CustomerPage = ({ match, history }) => {

  const { id = "new"} = match.params;

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const [editing, setEditing] = useState(false);

  // Récuperation du customer en fonction de l'identifiant
  const fetchCustomer = async id => {
    try {
      const {firstName, lastName, email, company} = await CustomersAPI.find(id);
      setCustomer({ firstName, lastName, email, company});
    } catch(error) {
      history.replace("/customers");
    }
  }

  // Chargement du customer si besoin au chargement du ocmposant ou au changement de l'identifiant
  useEffect(() => {
    if(id !== "new"){
      setEditing(true);
      fetchCustomer(id)
    }
  }, [id]);
  
  // Gestion des changements des inputs dans le formulaire
  const handleChange = event => {
    const {value, name} = event.target;
    setCustomer({...customer, [name]: value})
  }

  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if(editing) {
        await CustomersAPI.update(id, customer);
      } else {
        await CustomersAPI.create(customer);
        history.replace("/customers");
      }
      setErrors({});
    } catch({ response }) {
      const { violations } = response.data
      if(violations) {
        const apiErrors = {};
        violations.map(({propertyPath, message}) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
    }
  }

  return (
    <Fragment>
      {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}

      <form onSubmit={handleSubmit}>
        <Field
        name="lastName"
        label="Nom de famille"
        placeholder="Nom de famille du client"
        value={customer.lastName}
        onChange={handleChange}
        error={errors.lastName}
        />
        <Field 
        name="firstName"
        label="Prénom"
        placeholder="Prénom du client"
        value={customer.firstName}
        onChange={handleChange}
        error={errors.firstName}
        />
        <Field
        name="email"
        label="Email"
        placeholder="Adresse email du client"
        value={customer.email}
        onChange={handleChange}
        error={errors.email}
        type="email"
        />
        <Field
        name="company"
        label="Entreprise"
        placeholder="Entreprise du client"
        value={customer.company}
        onChange={handleChange}
        error={errors.company}
        />
      <div className="form-group">
        <button className="btn btn-success">Enregistrer</button>
        <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
      </div>
      </form>
    </Fragment>
  )
}

export default CustomerPage;
