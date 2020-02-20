import React, { Fragment, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import axios from 'axios';

const InvoicesPage = props => {

  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const data = await axios
      .get("http://127.0.0.1:8000/api/invoices")
      .then(response => response.data["hydra:member"]);
      setInvoices(data);
    } catch(error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <Fragment>
      <h1>Liste des factures</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice =>
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                </td>
              <td className="text-center">{invoice.sentAt}</td>
              <td className="text-center">
                <span className="badge badge-success">{invoice.status}</span>
              </td>
              <td className="text-center">{invoice.amount.toLocaleString("fr-FR")} €</td>
              <td>
                <button className="btn btn-sm btn-primary mr-1">Modifier</button>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
}

export default InvoicesPage;