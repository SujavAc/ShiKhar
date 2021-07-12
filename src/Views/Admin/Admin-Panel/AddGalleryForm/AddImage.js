import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { firebaseStorage, fireStore } from "../../../../Firebase/config";
import Snackbar from '../../../Website/Components/SnackBar/Snackbar';
import BackDrop from '../../../Website/Components/BackDrop/Backdrop';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: "url(" + Image + ")",
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1),
        width: "40ch",
      },
  
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "40ch",
      },
    },
  }));

export default function Editgallery() {
    const classes = useStyles();
    const [comment, setComment] = useState('');
    const [url,setUrl] = React.useState();
    const [carousel, setCarousel] = React.useState([]);
   
    const [state, setState] = useState({ open: false, photo: "" });
    const [msg, setMsg] = useState({ Error: "", Success: "" });
    const [open, setOpen] = React.useState(false);
    const [doc,setDoc] = React.useState();
    const[update,setUpdate] = React.useState(false);
    //backdrop
    const [green,setGreen]= useState(false);
    const [loading, setLoading] = React.useState(false);
  
  
    React.useEffect(() => {
        fireStore.collection("Carousel").onSnapshot(onCarouselUpdate);
      }, [carousel]);
    
      const onCarouselUpdate = (querySnapshot) => {
        const Carousel = [];
        querySnapshot.forEach((doc) => {
          const { Heading, SubHeading, Url } = doc.data();
          Carousel.push({
            key: doc.id,
            doc,
            Heading,
            SubHeading,
            Url,
          });
        });
        setCarousel(Carousel);
      };

    const handleClose = () => {
      setState((prevSetData) => ({
        open: false,
        photo: prevSetData.photo,
      }));
      console.log(state);
    };
  
    const handleSave = (files) => {
      //Saving files to state for further use and closing Modal.
      const image = files[0];
      setState({
        open: false,
        photo: image,
      });
    };
  
    const handleOpen = () => {
      setState((prevSetData) => ({
        open: true,
        photo: prevSetData.photo,
      }));
    };
    const handleCloseSnackBar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const handleClick = (e) => {
      e.preventDefault();
      
      if(!loading){
        setGreen(false);
        setLoading(true);
      }
      
      if (
        !state.photo && !url ||
        !comment
        
      ) {
        setOpen(true);
        setMsg({
          Error: "fill all the details",
        });
        
        setLoading(false);
        setGreen(false);
        
      } else {
          if(update==true && state.photo ){
            const img = state.photo;
            const uploadImage = firebaseStorage
              .ref(`Carousel Images/${img.name}`)
              .put(state.photo);
            uploadImage.on(
              "state_changed",
              (snapshot) => {
                console.log("snapshot");
              },
              (error) => {
                console.log(error);
              },
      
              () => {
                firebaseStorage
                  .ref("Carousel Images")
                  .child(img.name)
                  .getDownloadURL()
                  .then((url) =>
                  
                        fireStore
                        .collection("Carousel")
                        .doc(doc)
                        .update({
                            Heading:comment.heading,
                            SubHeading:comment.subHeading,
                            Url:url,
                            Date:Date().toLocaleString(),
                        })
                        .then((docRef) => {
                          setOpen(true);
                          setMsg({
                            Success: "Carousel have been updated!!",
                          });
                          setLoading(false);
                          setGreen(true);
                          setComment({
                              heading: "",
                              subHeading: "",
                          });
                          setUrl('');
                          setDoc('');
                          setState({open:false, photo:''});
                          
                        })
                        .catch((error) => {
                          setOpen(true);
                          setMsg({
                            Error: "Error writing document: ", error,
                          });
                          setLoading(false);
                          setGreen(false);
                        })
                      
                  
                    
                  );
              }
            );
          }
           else if(update==true && url ){
            
                        fireStore
                        .collection("Carousel")
                        .doc(doc)
                        .update({
                            Heading:comment.heading,
                            SubHeading:comment.subHeading,
                            Url:url,
                            Date:Date().toLocaleString(),
                        })
                        .then((docRef) => {
                          setOpen(true);
                          setMsg({
                            Success: "Carousel have been updated!!",
                          });
                          setLoading(false);
                          setGreen(true);
                          setComment({
                              heading: "",
                              subHeading: "",
                          });
                          setUrl('');
                          setDoc('');
                          setState({open:false, photo:''});

                          
                        })
                        .catch((error) => {
                          setOpen(true);
                          setMsg({
                            Error: "Error writing document: ", error,
                          });
                          setLoading(false);
                          setGreen(false);
                        })
                      
                  
                    
                  
          }
          else{
            const img = state.photo;
            const uploadImage = firebaseStorage
              .ref(`Gallery/${img.name}`)
              .put(state.photo);
            uploadImage.on(
              "state_changed",
              (snapshot) => {
                console.log("snapshot");
              },
              (error) => {
                console.log(error);
              },
      
              () => {
                firebaseStorage
                  .ref("Gallery")
                  .child(img.name)
                  .getDownloadURL()
                  .then((url) =>
                    fireStore
                      .collection("Gallery")
                      .add({
                        Comment:comment,
                        Url:url,
                        ImageName:state.photo.name,
                        Date:Date().toLocaleString(),
                      })
                      .then((docRef) => {
                        setOpen(true);
                        setMsg({
                          Success: "Image have been added to Gallery!!",
                        });
                        setLoading(false);
                        setGreen(true);
                        setComment('');
                        
                      })
                      .catch((error) => {
                        setOpen(true);
                        setMsg({
                          Error: "Error adding image to gallery: ", error,
                        });
                        setLoading(false);
                        setGreen(false);
                      })
                  );
              }
            );
          }
          }
        
    };
  
   

    return (
      <div style={{justifyContent:'center', alignContent:'center',display:'flex',flexDirection:'column'}}>
        <form className={classes.root} noValidate autoComplete="off">
        
        Add Image to Gallery
  

        <Button
          onClick={handleOpen.bind(this)}
          variant="contained"
          color="primary"
        >
          Add Image
        </Button>
        <DropzoneDialog
          open={state.open}
          onSave={handleSave.bind(this)}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose.bind(this)}
        />
        <TextField
          id="standard-basic-heading"
          label="Comment"
          value={comment}
          onChange={(event) => {
            const Heading = event.target.value;
            setComment(Heading);
          }}
        />
        {update ?(
            <div onClick={handleClick} >
            <BackDrop name={'Update'} type={green} loading={loading}/>
            {/* <BackDrop name={'Submit'} type={true} loading={false}/> */}
            </div>
        ):(
            <div onClick={handleClick} >
        <BackDrop name={'Submit'} type={green} loading={loading}/>
        {/* <BackDrop name={'Submit'} type={true} loading={false}/> */}
        </div>
        )}
        
        {msg.Error ? <Snackbar close={handleCloseSnackBar} state={open} message={(msg.Error)} type={'error'}/> : <Snackbar close={handleCloseSnackBar} state={open} message={(msg.Success)} type={'success'}/>}
      </form>
      </div>
      
      
    );
  }
  