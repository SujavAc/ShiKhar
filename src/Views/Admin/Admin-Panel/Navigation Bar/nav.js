import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './Header';

import { useAuth } from "../../../../Firebase/AuthProvider";



const Link = [
  { title: 'Create Carousel' },
  { title: 'Create News'},
  { title: 'Add Image to Gallery' },
  { title: 'Create User'},
  { title: 'Enquiry Data' },
  { title: 'Stakeholder message form' },
  { title: 'Logout' },

  
];



export default function Blog() {
  const { currentUser, logout } = useAuth();
  

  return (
    <React.Fragment>
      <CssBaseline />
      {currentUser?(
        <Container maxWidth="lg">
         
        <Header sections={Link} />
      </Container>
      ):(<></>)}
      
    </React.Fragment>
  );
}