import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';


console.log('Hello World !!!');

const App = () => {
    return (
      <HashRouter>
        <Navbar />
          <main className="container pt-5">
            <Switch>
              <Route path="/customers" component={CustomersPage} />
              <Route path="/invoices" component={InvoicesPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
      </HashRouter>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
