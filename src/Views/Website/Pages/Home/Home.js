import React from "react";
import "./Home.scss"
import Navigationbar from "../../Components/Navbar/Navbar";
import Movingcarousel from "../../Components/Carousel/Carousel";
import ContactUs from '../../Components/Contact-us/ContactUs'
import Footer from "../../Components/Footer/Footer";



class Home extends React.Component {
  render() {
    return (
      <div id="home">
        <Navigationbar />
        <div className="body">
          <div className="center">
            <Movingcarousel />
          </div>
        </div>
        <div className="contact-map">
          <div className="center map-contact">
            <div className="map">
              <h3>Find Us</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1765.6382298756334!2d85.31991792908372!3d27.739617692841442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cbc22cf633%3A0x6fec8b88900b24a5!2sShikhar%20Power%20Development%20Pvt.%20Ltd.!5e0!3m2!1sne!2snp!4v1602847757288!5m2!1sne!2snp"
                width="90%"
                height="80%"
              ></iframe>
            
            </div>
            <div className="contactus">
              <h3>Contact Us</h3>
              <ContactUs />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
