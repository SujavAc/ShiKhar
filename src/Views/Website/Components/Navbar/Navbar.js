import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import * as bs from "bootstrap/dist/css/bootstrap.css";
import "./Navbar.scss"
import sp from "../../../../Assets/sp.png";
import {Link } from 'react-router-dom'
import AdminNavigationBar from '../../../Admin/Admin-Panel/Navigation Bar/nav';

class Navigationbar extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      time: new Date().toLocaleString(),
    };
    
    
    
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
    
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString(),
    });
  }

  render() {
    
    return (
      <div id="topnav">
        <div className="clock ">
          <div className="center">{this.state.time}</div>
        </div>

        <div className="center ">
          <div className=" logo-container">
            <Link to="/">
              <div className="logo">
                <img src={sp} alt="Logo" />
              </div>
            </Link>
          </div>
        </div>

        <div className="navigation">
          <Navbar bg="dark" variant="dark" expand="lg">
            <div className="center">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  {/* <Nav.Link href="about-us">About Us</Nav.Link> */}
                  <NavDropdown title="About Us" id="basic-nav-dropdown">
                    <NavDropdown.Item href="about-us">
                      About Company
                    </NavDropdown.Item>
                    <NavDropdown.Item href="management-team">
                      Management Team
                    </NavDropdown.Item>
                    <NavDropdown.Item href="board-of-directors">
                      Board Of Directors
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                  </NavDropdown>
                  <NavDropdown title="Project" id="basic-nav-dropdown">
                    <NavDropdown.Item href="bhim-khola">
                      Project 1 (Bhim Khola 4.96 MWh)
                    </NavDropdown.Item>
                    <NavDropdown.Item href="lower-bhim-khola">
                      Project 2 (Lower Bhim Khola 7.1 MWh)
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="gallery">Gallery</Nav.Link>
                  <Nav.Link href="news">News</Nav.Link>
                  <Nav.Link href="#career">Career</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
        <AdminNavigationBar/>
      </div>
    );
}};
export default Navigationbar;
