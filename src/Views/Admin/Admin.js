import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login/Login";
import Adminpanel from "./Admin-Panel/Adminpanel";
import {AuthProvider} from '../../Firebase/AuthProvider';
import PrivateRoute from '../Website/Privatesroutes';
import AddProfile from '../Website/Pages/Team/Board of Directors/AddProfile';

function Admin() {
  return (
    <Router>
      <Switch>
      <AuthProvider>
        <PrivateRoute exact path="/Login" component={Login} />
        <PrivateRoute exact path="/Adminpanel" component={Adminpanel} />
        <PrivateRoute exact path="/AddProfile" component={AddProfile} />
        </AuthProvider>
      </Switch>
      
    </Router>
  );
}

export default Admin;