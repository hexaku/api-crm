import React, { Component, Fragment, useState, useEffect } from 'react'
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';
import CustomersAPI from '../services/customersAPI';
import axios from 'axios';

const InvoicePage = ({history, match}) =>{

  const {id = "new"} = match.params; 
  
  const [invoice, setInvoice] = useState({
    amount: 0,
    customer: "",
    status: "SENT"
  });

  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: ""
  });

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);

      if(!invoice.customer) setInvoice({...invoice, customer: data[0].id});
    } catch(error) {
      console.log(error.response)
    }
  }

  const fetchInvoice = async id => {
    try {
      const data = 
      await axios
        .get("http://127.0.0.1:8000/api/invoices/" + id)
        .then(response => response.data);
      const {amount, status, customer} = data;
      setInvoice({amount, status, customer: customer.id});
    } catch(error) {
      console.log(error.response)
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if(id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id])

  // Gestion des changements des inputs dans le formulaire
  const handleChange = event => {
    const {value, name} = event.target;
    setInvoice({...invoice, [name]: value})
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if(editing) {
        const response = await axios.put("http://127.0.0.1:8000/api/invoices/" + id,
        {...invoice, customer: `/api/customers/${invoice.customer}`})
        console.log(response);
      }else{
        const response = await axios.post(
          "http://127.0.0.1:8000/api/invoices",{
            ...invoice,
            customer: `/api/customers/${invoice.customer}`
          });
          history.replace("/invoices");
      }
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
      {editing && <h1>Modification d'une facture</h1> || <h1>Création d'une facture</h1>}
      <form onSubmit={handleSubmit}>
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
          {customers.map(customer => 
            <option 
            key={customer.id} 
            value={customer.id}
            >
              {customer.firstName} {customer.lastName}
            </option>
          )}
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
