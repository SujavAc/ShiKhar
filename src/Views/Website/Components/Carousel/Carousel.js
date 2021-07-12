import React from "react";
import Carousel from "react-bootstrap/Carousel";
import LinearProgress from "@material-ui/core/LinearProgress";
import { firebaseStorage, fireStore } from "../../../../Firebase/config";
import {useAuth} from '../../../../Firebase/AuthProvider';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '../../Components/SnackBar/Snackbar'
import BackDrop from '../../Components/BackDrop/Backdrop';

export default function Movingcarousel() {
  const [carousel, setCarousel] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const {currentUser} = useAuth();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });

  const [green,setGreen]= React.useState(false);
  const [bloading,setBLoading]= React.useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  React.useEffect(() => {
    fireStore.collection("Carousel").onSnapshot(onCarouselUpdate);
  }, [carousel]);

  const onCarouselUpdate = (querySnapshot) => {
    const Carousel = [];
    querySnapshot.forEach((doc) => {
      const { Heading, SubHeading, Url,ImageRef } = doc.data();
      Carousel.push({
        key: doc.id,
        doc,
        Heading,
        SubHeading,
        Url,
        ImageRef
      });
    });
    setCarousel(Carousel);
    setLoading(false);
  };

  const handleDelete=(id,imageName)=>()=>{
    if(!bloading){
      setGreen(false);
      setBLoading(true);
    }
    firebaseStorage
      .ref()
      .child(`Carousel Images/${imageName}`)
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    fireStore
      .collection("Carousel")
      .doc(id)
      .delete()
      .then(() => {
        
        setOpen(true); 
        setMessage({ success: " Courosel deleted successfully" });
        setBLoading(false);
        setGreen(true);
        
      })
      .catch((error) => {
        setMessage({ error: "Error in deletion the image form gallery" });
        setBLoading(false);
        setGreen(false);
      });
  }

  return (
    <div>
      {loading ? (
        <div>
          <LinearProgress />
        </div>
      ) : carousel === 0 ? (
        <div>
          <p>Corousel are Empty</p>
        </div>
      ) : (
        <>
          <Carousel>
            {carousel.map((value) => {
              return (
                <Carousel.Item key={value.key}>
                  
                  <img
                    className="d-block w-100"
                    src={value.Url}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{value.Heading}</h3>
                    <p>{value.SubHeading}</p>
                    {currentUser ?(<BackDrop name={'Delete'} type={green} loading={bloading} handleClick={handleDelete(value.key,value.ImageRef)}/>):(<></>)}
                  </Carousel.Caption>
                  
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      )}
      {message.success ? (
        <Snackbar
          close={handleCloseSnackBar}
          state={open}
          message={message.success}
          type={"success"}
        />
      ) : (
        <Snackbar
          close={handleCloseSnackBar}
          state={open}
          message={message.error}
          type={"error"}
        />
      )}
    </div>
  );
}
