import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

const CustomersPage = () => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/customers")
    .then(response => (response.data["hydra:member"]))
    .then(data => setCustomers(data))
    .catch(error => console.log(error.response));
  }, []);

  const handleDelete = id => {

    const originalCustomers = [...customers];

    setCustomers(customers.filter(customer => customer.id !== id));

    axios.delete("http://127.0.0.1:8000/api/customers/" + id)
    .then(response => console.log("ok"))
    .catch(error => {
      setCustomers(originalCustomers);
      console.log(error.response);
    })
  }

  const itemsPerPage = 10;
  const pagesCount = Math.ceil(customers.length/itemsPerPage);
  const pages = [];

  for(let i = 1; i <= pagesCount; i++){
    pages.push(i);
  }
  console.log(pages);

  return (
    <Fragment>
      <h1>Liste des clients</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => <tr key={customer.id}>
            <td>{customer.id}</td>
            <td><a href="#">{customer.firstName} {customer.lastName}</a></td>
            <td>{customer.email}</td>
            <td>{customer.company}</td>
            <td className="text-center">
              <span className="badge badge-light">{customer.invoices.length}</span>
            </td>
            <td className="text-center">{customer.totalAmount.toLocaleString("fr-FR")} €</td>
            <td>
              <button 
              onClick={() => handleDelete(customer.id)}
              disabled={customer.invoices.length > 0}
              className="btn btn-sm btn-danger">
              Supprimer
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
      <div>
        <ul className="pagination pagination-sm">
          <li className="page-item disabled">
            <a className="page-link" href="#">&laquo;</a>
          </li>
          {pages.map(page => 
            <li key={page} className={"page-item" + (currentPage === page && " active")}>
              <a className="page-link" href="#">{page}</a>
            </li>
          )}
          <li className="page-item">
            <a className="page-link" href="#">&raquo;</a>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default CustomersPage;
