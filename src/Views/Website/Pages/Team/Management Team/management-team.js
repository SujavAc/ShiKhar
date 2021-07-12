import React from "react";
import "./management-team.scss";
import Navigationbar from "../../../Components/Navbar/Navbar";
import { Image } from "react-bootstrap";
import managementteam from "../../../../../Assets/managementteam.JPG";
import Footer from "../../../Components/Footer/Footer";





class MANAGEMENTTEAM extends React.Component {
  render() {
    return (
      <div id="managementteam">
        <Navigationbar />
        <div className="center">
          <div className="title">
            <h3>Management Team</h3>
          </div>
          <div className="image">
            <Image src={managementteam} />
          </div>
        </div>
        <Footer />
      </div>
    );
}
}

export default MANAGEMENTTEAM;


