import React from "react";
import sp from "../../../../Assets/sp.png";
import './Footer.scss';
import { Link } from "react-router-dom";




class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        <div className="center">
          <div className="location">
            <div className="logo">
              <img src={sp} alt="Logo" />
            </div>
            <p>Tokha-10, Kathmandu,Nepal</p>
            <p>Tel: 00977-1-4352279</p>
            <p>Email: shikhar@shikharhydro.com</p>
          </div>
          <div className="aboutus">
            <h2>About Us</h2>
            <Link to="/about-us">About Company</Link>
            <Link to="management-team">Management Team</Link>
            <Link to="/board-of-directors">Board Of Directors</Link>
          </div>
          <div className="usefullink">
            <h2>Useful Links</h2>
            <a href="http://www.doed.gov.np/">DoED</a>
            <a href="https://www.moewri.gov.np/">Ministry of Energy</a>
            <a href="http://www.moenv.gov.np/">Ministry of Environment</a>
            <a href="https://www.nea.org.np/">Nepal electricity authority</a>
          </div>
        </div>
      </div>
    );
}};
export default Footer;