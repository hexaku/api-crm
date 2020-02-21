import React, { Fragment, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import moment from 'moment';
import invoicesAPI from '../services/invoicesAPI';

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger"
};

const STATUS_LABELS = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée"
};

const InvoicesPage = () => {

  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;

    // Permet d'aller récuperer les invoices
  const fetchInvoices = async () => {
    try {
      const data = await invoicesAPI.findAll()
      setInvoices(data);
    } catch(error) {
      console.log(error.response);
    }
  };

  // Au chargement du composant, on va chercher les invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Gestion du changement de page
  const handleChangePage = page => setCurrentPage(page);

  // Gestion de la recherche
  const handleSearch = event => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  // Gestion de la suppression d'un invoice
  const handleDelete = async id => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter(customer => customer.id !== id));

    try {
      await invoicesAPI.delete(id)
    } catch(error) {
      setInvoices(originalInvoices);
    }
  };

  // Gestion de date
  const formatDate = (str) => moment(str).format('DD/MM/YYYY');

  // Filtrage des invoices en fonction de la recherche
  const filteredInvoices = 
  invoices.filter(invoice => 
    invoice.customer.lastName.toLowerCase().includes(search.toLowerCase()) || 
    invoice.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
    invoice.amount.toString().includes(search.toLowerCase()) ||
    STATUS_LABELS[invoice.status].toLowerCase().includes(search.toLowerCase())
    );

  // Pagination des données
  const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

  return (
    <Fragment>
      <h1>Liste des factures</h1>

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
            <th>Numéro</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map(invoice =>
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
              </td>
              <td className="text-center">{invoice.amount.toLocaleString("fr-FR")} €</td>
              <td>
                <button className="btn btn-sm btn-primary mr-1">Modifier</button>
                <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button> 
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination 
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onChangePage={handleChangePage}
      length={filteredInvoices.length}
      />
    </Fragment>
  );
}

export default InvoicesPage;