//import { Navigation } from "@material-ui/icons";
import React, { useContext, useEffect } from "react";

//import {auth} from "../../../../firebase/config";
//import {useHistory} from 'react-router-dom';
// import {useAuth} from '../../../../firebase/AuthProvider';
// import Footer2 from '../../components/Footer/Footer';

import Navigationbar from "../../Website/Components/Navbar/Navbar";
import Footer from "../../Website/Components/Footer/Footer";
import './Admin-Panel.scss';

const Dashboard = () => {
  
  
 

  
 
  
  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <Navigationbar />
      
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        
       
      </div>
      
      <Footer />
    </div>
  ) 
};
export default Dashboard;