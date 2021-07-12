import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Aboutus from "./Pages/About us/AboutUs";
import Gallery from "../Website/Pages/Gallery/Gallery"
import BOD from "./Pages/Team/Board of Directors/BOD";
import HBK from "./Pages/Projects/Bhim Khola 4.96 MWh/BK-4.96-MWh";
import LBK from "./Pages/Projects/Lower Bhimkhola 4.96MW/LBK-4.96-MWh"
import News from "./Pages/News/News";
import MANAGEMENTTEAM from "./Pages/Team/Management Team/management-team"

//Admin Component

import Login from '../Admin/Login/Login';
import Dashboard from '../Admin/Admin-Panel/Adminpanel';
import SignUp from '../Admin/Admin-Panel/Create User/signup';
import PasswordReset from '../Admin/Admin-Panel/Paasword Reset/passwordreset';
import {AuthProvider} from '../../Firebase/AuthProvider';
import PrivateRoute from './Privatesroutes';


function Website() {
  return (
    <Router>
      <Switch>
         {/* //admin section */}
       <AuthProvider>
      <Route exact path="/spadmin" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/signup" component={SignUp} />
      <Route exact path="/passwordreset" component={PasswordReset} />

        <Route exact path="/news" component={News} />
        <Route exact path="/bhim-khola" component={HBK} />
        <Route exact path="/lower-bhim-khola" component={LBK} />
        <Route exact path="/board-of-directors" component={BOD} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/about-us" component={Aboutus} />
        <Route exact path="/management-team" component={MANAGEMENTTEAM} />
        <Route exact path="/" component={Home} />
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default Website;