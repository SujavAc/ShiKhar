import React from "react";
import { useHistory } from "react-router";
import Navigationbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./BOM.scss";
import Button from "@material-ui/core/Button";
import { Container, Row, Col, Image } from "react-bootstrap";
import hemraj from "../../../../../Assets/Hemraj.jpg";
import narayan from "../../../../../Assets/Narayan.jpg";
import { useAuth } from "../../../../../Firebase/AuthProvider";
import Edit from "./AddProfile";
import { fireStore, firebaseStorage } from "../../../../../Firebase/config";
import AddInvolvedOrganization from "./AddInvolvedOrganisaton";
import AddPresentInvolvedOrganization from "./AddPresentInvolvedOrganization";
import InvolvedORG from "./InvolvedOrg";
import PresentOrg from "./PresentOrg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Snackbar from "../../../Components/SnackBar/Snackbar";

export default function BOD() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = React.useState([]);
  const [message,setMessage] = React.useState({error:'',success:''});
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fireStore.collection("BOD").onSnapshot(onProfileUpdate);
  }, [profile]);

  const onProfileUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Email, FullName, Url, ImageName, PhoneNumber, Title, Date } =
        doc.data();
      data.push({
        key: doc.id,
        doc,
        Email,
        FullName,
        Url,
        ImageName,
        PhoneNumber,
        Title,
        Date,
      });
    });
    setProfile(data);
  };

  const handleDelete = (key) => ()  =>{
    
    fireStore.collection('BOD').doc(key).delete().then((docRef)=>{
      setOpen(true);
      setMessage({success:'Deleted Successfully'});

    }).catch((error)=>{
      setOpen(true);
      setMessage({error:"Error while deleting the profile "});
    })
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div id="bom">
      <Navigationbar />
      <div className="center">
        <div className="title">
          <h3>Board of Directors</h3>
        </div>
        <div className="members">
          {currentUser ? (
            <Col xs={12} md={4}>
              <div className="icons">
                <Button
                  aria-controls="simple-menu"
                  variant="contained"
                  onClick={() => {
                    history.push("./AddProfile");
                  }}
                >
                  <PersonAddIcon />
                </Button>
              </div>
            </Col>
          ) : (
            <></>
          )}

          {currentUser ? (
            <Container>
              {profile.map((value, index) => {
                return (
                  <div key={index}>
                    <Row className="borderbuttom">
                      <Col xs={12} md={4}>
                        <div style={{display:'flex', flexDirection:'rows', justifyContent:'space-between'}}>
                          <Image src={value.Url} thumbnail />
                          <Button variant="contained" color="primary" onClick={handleDelete(value.key)}>
                            <DeleteForeverIcon />
                          </Button>
                        </div>
                        <h5>{value.FullName}</h5>
                        <p>{value.Title}</p>
                        <span>E-mail: {value.Email}</span>
                        <span>Phone: {value.PhoneNumber}</span>
                      </Col>
                      <Col xs={12} md={8}>
                        <h3>Involved Organizations</h3>

                        <AddInvolvedOrganization ID={value.key} />
                        <InvolvedORG ID={value.key} />
                        <h3>Present Involved Organizations</h3>
                        <AddPresentInvolvedOrganization ID={value.key} />
                        <PresentOrg ID={value.key} />
                      </Col>
                    </Row>
                  </div>
                );
              })}

              
            </Container>
          ) : (
            
            <Container>
              {profile.map((value, index) => {
                return (
                  <div key={index}>
                    <Row className="borderbuttom">
                      <Col xs={12} md={4}>
                        <Image src={value.Url} thumbnail />
                        <h5>{value.FullName}</h5>
                        <p>{value.Title}</p>
                        <span>E-mail: {value.Email}</span>
                        <span>Phone: {value.PhoneNumber}</span>
                      </Col>
                      <Col xs={12} md={8}>
                        <h3>Involved Organizations</h3>

                        <InvolvedORG ID={value.key} />
                        <h3>Present Involved Organizations</h3>

                        <PresentOrg ID={value.key} />
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Container>
          )}
          {message.error ? (
        <Snackbar
          close={handleCloseSnackBar}
          state={open}
          message={message.error}
          type={"error"}
        />
      ) : (
        <Snackbar
          close={handleCloseSnackBar}
          state={open}
          message={message.success}
          type={"success"}
        />
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
