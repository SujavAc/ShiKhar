import React from "react";
import "./AboutUs.scss";
import Navigationbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Image } from "react-bootstrap";
import { fireStore } from "../../../../Firebase/config";
import {useAuth} from "../../../../Firebase/AuthProvider";
import { makeStyles } from '@material-ui/core/styles';
import DeleteOrgMsg from './DeleteOrgMsg';
import EditOrgMsg from './EditOrgMessage';

const useStyles = makeStyles((theme) => ({
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Aboutus = () => {
  const [message, setMessage] = React.useState([]);
  const {currentUser} = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    fireStore.collection("OrgMessage").onSnapshot(onMessageUpdate);
  }, [message]);

  const onMessageUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const {
        Message,
        Date,
        Title,
        Url,
        ImageRef
      } = doc.data();
      data.push({
        key: doc.id,
        doc,
        
        Message,
        Date,
        Title,
        Url,
        ImageRef
      });
    });
    setMessage(data);
  };
  return (
    <div id="about">
      <Navigationbar />
      <div className="center">
        <div className="title">
          <h3>About US</h3>
        </div>
        <div className="abouttext">
          Shikhar Power Development Pvt.. Ltd. (SPDPL) was established in
          2071-05-26 B.S. (September- 11-2015 A.D.) in Kathmandu, Nepal with the
          registration no. 111336/068/070 under the Company Act 2063 of the
          government of Nepal. The Company was established with the aim of
          harnessing hydropower potential of the country in order to contribute
          for the development of the country.
          <br />
          <br /> SPDPL will be initially generating 4.96 MW and its cascade
          project will be 7.1 MW. In the same way, we are moving forward with
          the determination to progressively increase the generating capacity in
          the long run. Preliminary estimate has shown that about 42,000-50,000
          MW of hydroelectricity could be generated in Nepal which is feasible
          techno-economically. But on the contrary, only 2% - 3% of the total
          capacity is produced in our country which is very minimalistic. This
          great possibility of hydroelectricity is due to the continuous rivers
          flowing from north to south of the country with favorable geographical
          topography for the generation of hydroelectric projects. Understanding
          such huge potential, SPDPL is ambitious in taking the country one step
          forward in its development by providing a bright and prosperous future
          for us all.
        </div>
        <div className="message-from">
          <div className="message">
            {message.map((value) => {
              return (
                <div className="message-box" key={value.key}>
                  <div className="box">
                    <Image src={value.Url} thumbnail className="image" />

                    <div className="text">
                      <h5>{value.Title}</h5>
                      <h6>{value.Message}</h6>
                      
                    </div>
                    {currentUser ? (
                  <div className={classes.button}>
                        <EditOrgMsg 
                        id={value.key}  
                        imgName={value.ImageRef}
                        
                        title={value.Title}
                        message={value.Message}
                        
                        url={value.Url}
                        />
                        <DeleteOrgMsg imgName={value.ImageRef} id={value.key}/>
                      </div>
                      ):(<></>)}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
