import React, { Fragment, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import customersAPI from '../services/customersAPI';

const CustomersPage = () => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Permet d'aller récuperer les customers
  const fetchCustomers = async () => {
    try {
      const data = await customersAPI.findAll()
      setCustomers(data);
    } catch(error) {
      console.log(error.response)
    }
  }

  // Au chargement du composant, on va chercher les customers
  useEffect(() => {
    fetchCustomers()
  }, []);

  // Gestion de la suppression d'un customer
  const handleDelete = async id => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter(customer => customer.id !== id));

    try {
      await customersAPI.delete(id)
    } catch(error) {
      setCustomers(originalCustomers);
    }
  }

  // Gestion du changement de page
  const handleChangePage = page => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = event => {
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  const itemsPerPage = 10;

  // Filtrage des customers en fonction de la recherche
  const filteredCustomers = 
    customers.filter(customer => 
      customer.firstName.toLowerCase().includes(search.toLowerCase()) || 
      customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(search.toLowerCase()))
      );

  // Pagination des données
  const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

  return (
    <Fragment>
      <h1>Liste des clients</h1>

      <div className="form-group">
        <input 
        className="form-control"
        placeholder="Rechercher..."
        onChange={handleSearch}
        value={search}
        />
      </div>

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
          {paginatedCustomers.map(customer => <tr key={customer.id}>
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
      {itemsPerPage < filteredCustomers.length && (
        <Pagination 
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        length={filteredCustomers.length}
        onChangePage={handleChangePage}
        />
      )}
    </Fragment>
  )
}

export default CustomersPage;
