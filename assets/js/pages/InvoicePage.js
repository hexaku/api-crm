import React, { Component, Fragment, useState } from 'react'
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';

const InvoicePage = props =>{
  
  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: ""
  });

  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: ""
  });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = event => {
      const {value, name} = event.target;
      setInvoice({...invoice, [name]: value})
    }

  return (
    <Fragment>
      <h1>Création d'une facture</h1>
      <form>
        <Field
        name="amount"
        type="number"
        placeholder="Montant de la facture"
        label="Montant"
        onChange={handleChange}
        value={invoice.amount}
        error={errors.amount}
        />
        <Select
        name="customer"
        label="Client"
        value={invoice.customer}
        error={errors.customer}
        onChange={handleChange}
        >
          <option value="1">Lior Chamla</option>
          <option value="2">Magali Pernin</option>
        </Select>
        <Select
        name="status"
        label="Statut"
        value={invoice.status}
        error={errors.status}
        onChange={handleChange}
        >
          <option value="SENT">Envoyée</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>
        <div className="form-group">
          <button className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/invoices" className="btn btn-link">Retour aux factures</Link>
        </div>
      </form>
    </Fragment>
  )
}

export default InvoicePage;
