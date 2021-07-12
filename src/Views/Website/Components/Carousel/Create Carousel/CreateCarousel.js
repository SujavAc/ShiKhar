import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { firebaseStorage, fireStore } from "../../../../../Firebase/config";
import Snackbar from '../../SnackBar/Snackbar';
import BackDrop from '../../BackDrop/Backdrop';
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

export default function CreateCarousel() {
    const classes = useStyles();
    const [comment, setComment] = useState({
      heading: "",
      subHeading: "",
      
      
    });
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
        !comment.heading ||
        !comment.subHeading
        
      ) {
        setOpen(true);
        setMsg({
          Error: "fill all the details",
        });
        
        setLoading(false);
        setGreen(false);
      }
      //  else {
      //     if(update==true && state.photo ){
      //       const img = state.photo;
      //       const uploadImage = firebaseStorage
      //         .ref(`Carousel Images/${img.name}`)
      //         .put(state.photo);
      //       uploadImage.on(
      //         "state_changed",
      //         (snapshot) => {
      //           console.log("snapshot");
      //         },
      //         (error) => {
      //           console.log(error);
      //         },
      
      //         () => {
      //           firebaseStorage
      //             .ref("Carousel Images")
      //             .child(img.name)
      //             .getDownloadURL()
      //             .then((url) =>
                  
      //                   fireStore
      //                   .collection("Carousel")
      //                   .doc(doc)
      //                   .update({
      //                       Heading:comment.heading,
      //                       SubHeading:comment.subHeading,
      //                       Url:url,
      //                       Date:Date().toLocaleString(),
      //                       ImageRef:state.photo.name
      //                   })
      //                   .then((docRef) => {
      //                     setOpen(true);
      //                     setMsg({
      //                       Success: "Carousel have been updated!!",
      //                     });
      //                     setLoading(false);
      //                     setGreen(true);
      //                     setComment({
      //                         heading: "",
      //                         subHeading: "",
      //                     });
      //                     setUrl('');
      //                     setDoc('');
      //                     setState({open:false, photo:''});
                          
      //                   })
      //                   .catch((error) => {
      //                     setOpen(true);
      //                     setMsg({
      //                       Error: "Error writing document: ", error,
      //                     });
      //                     setLoading(false);
      //                     setGreen(false);
      //                   })
                      
                  
                    
      //             );
      //         }
      //       );
      //     }
      //      else if(update==true && url ){
            
      //                   fireStore
      //                   .collection("Carousel")
      //                   .doc(doc)
      //                   .update({
      //                       Heading:comment.heading,
      //                       SubHeading:comment.subHeading,
      //                       Url:url,
      //                       Date:Date().toLocaleString(),
                            
      //                   })
      //                   .then((docRef) => {
      //                     setOpen(true);
      //                     setMsg({
      //                       Success: "Carousel have been Added!!",
      //                     });
      //                     setLoading(false);
      //                     setGreen(true);
      //                     setComment({
      //                         heading: "",
      //                         subHeading: "",
      //                     });
      //                     setUrl('');
      //                     setDoc('');
      //                     setState({open:false, photo:''});

                          
      //                   })
      //                   .catch((error) => {
      //                     setOpen(true);
      //                     setMsg({
      //                       Error: "Error writing document: ", error,
      //                     });
      //                     setLoading(false);
      //                     setGreen(false);
      //                   })
                      
                  
                    
                  
      //     }
          else{
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
                      .add({
                        Heading:comment.heading,
                        SubHeading:comment.subHeading,
                        Url:url,
                        Date:Date().toLocaleString(),
                        ImageRef:state.photo.name
                      })
                      .then((docRef) => {
                        setOpen(true);
                        setMsg({
                          Success: "Carousel have been Added!!",
                        });
                        setLoading(false);
                        setGreen(true);
                        setComment({
                            heading: "",
                            subHeading: "",
                        });
                        
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
          // }
        
    };
  
   

    return (
      <div style={{justifyContent:'center', alignContent:'center',display:'flex',flexDirection:'column'}}>
        <form className={classes.root} noValidate autoComplete="off">
        {/* <TextField
          id="standard-select-currency"
          select
          label="Edit carousel"
          helperText="Please select carousel from list to update it"
          defaultValue=""
          
        >
          {carousel.map((option) => (
            <MenuItem key={option.key}  value={option.Heading}
            onClick={()=>{
                setComment({heading:option.Heading,subHeading:option.SubHeading});
                setUrl(option.Url);
            setUpdate(true);
            
            setDoc(option.key);
        }}
            >
              {option.Heading}
            </MenuItem>
          ))}
        </TextField>    */}
        Create Carousel
        <TextField
          id="standard-basic-heading"
          label="Heading"
          value={comment.heading}
          onChange={(event) => {
            const Heading = event.target.value;
            setComment((prevSetData) => ({
              heading:Heading,
              subHeading:prevSetData.subHeading
            }));
          }}
        />
        <TextField
          id="standard-basic-sunheading"
          label="Sub-Heading"
          value={comment.subHeading}
          onChange={(event) => {
            const SubHeading = event.target.value;
            setComment((prevSetData) => ({
              heading:prevSetData.heading,
              subHeading:SubHeading
            }));
          }}
        />
        
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
  