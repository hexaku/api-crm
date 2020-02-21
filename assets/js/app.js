import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route, withRouter, Redirect} from "react-router-dom";
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';

AuthAPI.setup();

const PrivateRoute = ({path, component}) => {

  const {isAuthenticated} = useContext(AuthContext);

  return isAuthenticated 
  ? <Route path={path} component={component} />
  : <Redirect to="/login" />
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  const NavbarWithRouter = withRouter(Navbar);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavbarWithRouter />
          <main className="container pt-5">
            <Switch>
              <Route path="/login" component={LoginPage}/>
              <PrivateRoute path="/customers" component={CustomersPage}/>
              <PrivateRoute path="/invoices" component={InvoicesPage}/>
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App/>, rootElement);
