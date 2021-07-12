import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import emailjs from "emailjs-com";
import { fireStore } from "../../../../Firebase/config";
import SnackBar from '../../Components/SnackBar/Snackbar';

export default function ContactUs() {
  const [contactdata, setContactData] = React.useState({
    Name: "",
    Email: "",
    Message: "",
    Number: "",
  });
  const [snackbar, setSnackbar] = React.useState(false);


  const [msg, setMsg] = React.useState({ Error: "", Success: "" });

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  function sendEmail(e) {
    e.preventDefault();
    
    if (
      !contactdata.Name ||
      !contactdata.Email ||
      !contactdata.Number ||
      !contactdata.Message
    ) {
      setSnackbar(true);
      setMsg({Error:'Fill all the details'});
    }else if(!pattern.test(contactdata.Email)){
      setSnackbar(true);
      setMsg({
        Error: "Use valid Email",
      });
    }else{
      fireStore.collection("ContactUs").add({
        FullName: contactdata.Name,
        Email: contactdata.Email,
        Phone_Number: contactdata.Number,
        Message: contactdata.Message,
        Date: Date().toLocaleString(),
        Status:'unread'
      }).then((docRef)=>{
        emailjs
      .send("service_qczx2t7", "template_u6qo243", contactdata, "user_GSMj9zI0l52F0GrdE2EOE");
        setSnackbar(true);
        setMsg({Success:'Your Enquiry is Successfully Delivered'});
        
    setContactData({
      Name: "",
      Email: "",
      Message: "",
      Number: "",
    });
      }).catch((error) => {
        setSnackbar(true);
        setMsg({Error:"Error in sending your Enquiry, Please Try Again!!!: ", error});
      })

    }
    

    
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };
    return (
      <Form onSubmit={sendEmail}>
        <Form.Group size="sm" as={Row} controlId="formPlaintextFname">
          <Form.Label column sm="3">
            Full Name:
          </Form.Label>
          <Col sm="8">
            <Form.Control type="text" placeholder="Your Name"
            value={contactdata.Name}
            onChange={(event) => {
              const name = event.target.value;
              setContactData((prevSetData) => ({
                Name: name,
                Email: prevSetData.Email,
                Message: prevSetData.Message,
                Number: prevSetData.Number,
              }));
            }}
          />
          </Col>
        </Form.Group>
        <Form.Group size="sm" as={Row} controlId="formPlaintextPnum">
          <Form.Label column sm="3">
            Phone No:
          </Form.Label>
          <Col sm="8">
            <Form.Control type="number" placeholder="98********" 
            value={contactdata.Number}
            onChange={(event) => {
              const number = event.target.value;
              setContactData((prevSetData) => ({
                Name: prevSetData.Name,
                Email: prevSetData.Email,
                Message: prevSetData.Message,
                Number: number,
              }));
            }}
            />
          </Col>
        </Form.Group>
        <Form.Group size="sm" as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="3">
            Email:
          </Form.Label>
          <Col sm="8">
            <Form.Control type="email" placeholder="Your Mail Address" 
            value={contactdata.Email}
            onChange={(event) => {
              const email = event.target.value;
              setContactData((prevSetData) => ({
                Name: prevSetData.Name,
                Email: email,
                Message: prevSetData.Message,
                Number: prevSetData.Number,
              }));
            }}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Comments:</Form.Label>
          <Form.Control as="textarea" rows="3" 
          value={contactdata.Message}
          onChange={(event) => {
            const message = event.target.value;
            setContactData((prevSetData) => ({
              Name: prevSetData.Name,
              Email: prevSetData.Email,
              Message: message,
              Number: prevSetData.Number,
            }));
          }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {msg.Error ? <SnackBar close={handleCloseSnackBar} state={snackbar} message={(msg.Error)} type={'error'}/> : <SnackBar close={handleCloseSnackBar} state={snackbar} message={(msg.Success)} type={'success'}/>}
      </Form>
    );
}

