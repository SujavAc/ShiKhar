import React from "react";
import { fireStore, firebaseStorage } from "../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
//import { Snackbar } from "@material-ui/core";
import BackDrop from "../../Components/BackDrop/Backdrop";
import Snackbar from '../../Components/SnackBar/Snackbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root:{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
    "& > *": {
      margin: theme.spacing(1),
    },
    menu:{
        width:'100%',
    },
  },
}));

export default function AddBoD(props) {
    //snackbar
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });

  //Photo
  const [state, setState] = React.useState({ open: false, photo: "" });

  const [form, setForm] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
 
  const [data, setData] = React.useState({
    FullName: props.fullName,
    Title:props.title,
    Email:props.email,
    PhoneNumber:props.phone,
  });
  //backdrop
  const [green, setGreen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //store props data

  const classes = useStyles();

    const handleCloseSnackBar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
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
  const handleMenuClose = () => {
    setForm(null);
  };

  const handelEdit = (event) => {
    setForm(event.currentTarget);
    setEditing(true);
  };
  const Add = (e) => {
    e.preventDefault();
    if (!loading) {
      setGreen(false);
      setLoading(true);
    }
    if ( !state.photo  || !data.Email || !data.FullName || !data.PhoneNumber || !data.Title ){
      setOpen(true);
      setMessage({
        error: "fill all the details",
      });
      console.log(data);

      setLoading(false);
      setGreen(false);
    } else {
      if (state.photo) {
        const img = state.photo;
        const uploadImage = firebaseStorage
          .ref(`Board of Director/${img.name}`)
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
    //         firebaseStorage
    //   .ref()
    //   .child(`Stakeholder/${name}`)
    //   .delete()
    //   .then(() => {
    //     // File deleted successfully
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //   });
            firebaseStorage
              .ref("Board of Director")
              .child(img.name)
              .getDownloadURL()
              .then((url) =>
                fireStore
                  .collection("Board of Director")
                  .add({
                    FullName: data.FullName,
                    Email:data.Email,
                    
                    Title:data.Title,
                    PhoneNumber:data.PhoneNumber,
                    Url:url,
                    ImageRef: state.photo.name,
                    Date: Date().toLocaleString(),
                  })
                  .then((docRef) => {
                    setOpen(true);
                    setMessage({
                      success: "Board Of Director have been added to our database!!",
                    });
                    setData({
                        FullName: '',
    Title:'',
    Email:'',
    PhoneNumber:'',
                    })
                    setLoading(false);
                    setGreen(true);
                    setForm(null);
                  })
                  .catch((error) => {
                    setOpen(true);
                    setMessage({
                      error: "Error updating image to gallery: ",
                      error,
                    });
                    setLoading(false);
                    setGreen(false);
                  })
              );
          }
        );
      }
    if(data.Url){
    
                fireStore
                  .collection("OrgMessage")
                  .doc(id)
                  .update({
                    "FullName": data.FullName,
                    "Email":data.Email,
                    "Message":data.Message,
                    "Title":data.Title,
                    "PhoneNumber":data.PhoneNumber,
                    "Date": Date().toLocaleString(),
                  })
                  .then((docRef) => {
                    setOpen(true);
                    setMessage({
                      success: "Stakeholder Message have been updated!!",
                    });
                    setLoading(false);
                    setGreen(true);
                    setForm(null);
                  })
                  .catch((error) => {
                    setOpen(true);
                    setMessage({
                      error: "Error updating message: please try again ",
                      error,
                    });
                    setLoading(false);
                    setGreen(false);
                  })
              
                }
        
    
    }
  };

  return (
    <div id="Gallery">
      <Button aria-controls="simple-menu" variant="contained" onClick={handelEdit}>
        Add
      </Button>
      <Menu id="simple-menu" anchorEl={form} keepMounted open={Boolean(form)} onClose={handleMenuClose} PaperProps={{
          style: {
            
            width: '30ch',
          }
        }}
        >
      <form className={classes.root} noValidate autoComplete="off">
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
            id="standard-basic-Name"
            label="Full Name"
            //defaultValue={data.FullName}
            onChange={(event) => {
              const Name = event.target.value;
              setData((prevSetData)=>({
                FullName:Name,
                Title:prevSetData.Title,
                PhoneNumber:prevSetData.PhoneNumber,
                Email:prevSetData.Email,
                Url:prevSetData.Url
              }));
            }}
          />
          <TextField
            id="standard-basic-Title"
            label="Title"
            //defaultValue={data.Title}
            onChange={(event) => {
                const title = event.target.value;
                setData((prevSetData)=>({
                  FullName:prevSetData.FullName,
                  Title:title,
                  PhoneNumber:prevSetData.PhoneNumber,
                  Email:prevSetData.Email,
                  Url:prevSetData.Url
                }));
              }}
          />
          
          <TextField
            id="standard-basic-Email"
            label="Email"
            //defaultValue={data.Email}
            onChange={(event) => {
                const email = event.target.value;
                setData((prevSetData)=>({
                  FullName:prevSetData.FullName,
                  Title:prevSetData.Title,
                  PhoneNumber:prevSetData.PhoneNumber,
                  Email:email,
                  Message:prevSetData.Message,
                  Url:prevSetData.Url
                }));
              }}
          />
          <TextField
            id="standard-basic-Phone"
            label="Phone-Number"
            //defaultValue={data.PhoneNumber}
            onChange={(event) => {
                const phone = event.target.value;
                setData((prevSetData)=>({
                  FullName:prevSetData.FullName,
                  Title:prevSetData.Title,
                  PhoneNumber:phone,
                  Email:prevSetData.Email,
                  Message:prevSetData.Message,
                  Url:prevSetData.Url
                }));
              }}
          />
          

        
          <BackDrop name={"Update"} type={green} loading={loading} handleClick={Add}/>
        
        </form>
      </Menu>
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
  );
}
