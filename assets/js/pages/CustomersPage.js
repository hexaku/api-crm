import React, { Fragment, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import customersAPI from '../services/customersAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const CustomersPage = () => {

  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Permet d'aller récuperer les customers
  const fetchCustomers = async () => {
    try {
      const data = await customersAPI.findAll()
      setCustomers(data);
      setLoading(false);
    } catch(error) {
      console.log(error.response)
      toast.error("Impossible de charger les clients");
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
      toast.info("Le client a bien été supprimé");
    } catch(error) {
      setCustomers(originalCustomers);
      toast.error("La suppression n'a pas pu fonctionner");
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
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h1>Liste des clients</h1>
        <Link to="/customers/new" className="btn btn-info">Créer un client</Link>
      </div>


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
        {!loading && <tbody>
          {paginatedCustomers.map(customer => <tr key={customer.id}>
            <td>{customer.id}</td>
            <td><Link to={"/customers/" + customer.id}>{customer.firstName} {customer.lastName}</Link></td>
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
        </tbody>}
      </table>
      {loading && <TableLoader />}
      
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
