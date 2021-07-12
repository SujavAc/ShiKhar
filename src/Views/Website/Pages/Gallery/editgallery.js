import React from "react";
import "./Gallery.scss";
import { fireStore, firebaseStorage } from "../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
//import { Snackbar } from "@material-ui/core";
import BackDrop from "../../Components/BackDrop/Backdrop";
import Snackbar from '../../Components/SnackBar/Snackbar';


const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function EditGallery(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });
  const [state, setState] = React.useState({ open: false, photo: "" });
  const [form, setForm] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const [green, setGreen] = React.useState(false);
  const [comment, setComment] = React.useState({
    Comment: props.comment,
    Url: props.url,
  });
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
  const Edit = (id,name) => (e) => {
    e.preventDefault();
    if (!loading) {
      setGreen(false);
      setLoading(true);
    }
    if (!comment.Url  || !comment.Comment) {
      setOpen(true);
      setMessage({
        error: "fill all the details",
      });

      setLoading(false);
      setGreen(false);
    } else {
      if (state.photo) {
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
      .ref()
      .child(`Gallery/${name}`)
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
            firebaseStorage
              .ref("Gallery")
              .child(img.name)
              .getDownloadURL()
              .then((url) =>
                fireStore
                  .collection("Gallery")
                  .doc(id)
                  .update({
                    "Comment": comment.Comment,
                    "Url":url,
                    "ImageName": state.photo.name,
                    "Date": Date().toLocaleString(),
                  })
                  .then((docRef) => {
                    setOpen(true);
                    setMessage({
                      success: "Gallery have been updated!!",
                    });
                    setLoading(false);
                    setGreen(true);
                    setComment("");
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
    if(comment.Url){
    
                fireStore
                  .collection("Gallery")
                  .doc(id)
                  .update({
                    "Comment": comment.Comment,
                    "Date": Date().toLocaleString(),
                  })
                  .then((docRef) => {
                    setOpen(true);
                    setMessage({
                      success: "Gallery have been updated!!",
                    });
                    setLoading(false);
                    setGreen(true);
                    setComment("");
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
              
                }
        
    
    }
  };

  return (
    <div id="Gallery">
      <Button aria-controls="simple-menu" variant="contained" onClick={handelEdit}>
        Edit
      </Button>
      <Menu id="simple-menu" anchorEl={form} keepMounted open={Boolean(form)} onClose={handleMenuClose}>
      
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
          value={comment.Comment}
          onChange={(event) => {
            const Heading = event.target.value;
            setComment((prevSetData=>({
              Comment: Heading,
              Url:prevSetData.Url
            })));
          }}
        />
        

        <div onClick={Edit(props.id,props.imgName)}>
          <BackDrop name={"Update"} type={green} loading={loading} />
        </div>
        
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
