import React from "react";
import { useHistory } from "react-router";
import { fireStore, firebaseStorage } from "../../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { emphasize, makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
//import { Snackbar } from "@material-ui/core";
import BackDrop from "../../../Components/BackDrop/Backdrop";
import Snackbar from "../../../Components/SnackBar/Snackbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CreateProfile from "../../../../../Assets/createprofile.JPG";
import Navbar from '../../../Components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    
   
    
    
  },
  image:{
    height:'600px',
    weidth:'400px',
    backgroundImage: `url(${CreateProfile})`,
    backgroundSize:'cover',
    opacity:'0.2',
  },
  form: {
    position:'absolute',
    top:'40%',
    left:'50%',
    width:'35%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function EditBoD() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });
  const [state, setState] = React.useState({ open: false, photo: "" });
  const [green, setGreen] = React.useState(false);
  const [data, setData] = React.useState({
    FullName: "",
    Title: "",
    Email: "",
    PhoneNumber: "",
  });
  const history = useHistory();
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

  const Edit = () => (e) => {
    e.preventDefault();
    if (!loading) {
      setGreen(false);
      setLoading(true);
    }
    if (!data.Email || !data.FullName || !data.PhoneNumber || !data.Title) {
      setOpen(true);
      setMessage({
        error: "fill all the details",
      });
      

      setLoading(false);
      setGreen(false);
    } else {
      const img = state.photo;
      const uploadImage = firebaseStorage
        .ref(`BOD/${img.name}`)
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
            .ref("BOD")
            .child(img.name)
            .getDownloadURL()
            .then((url) =>
              fireStore
                .collection("BOD")
                .add({
                  FullName: data.FullName,
                  Email: data.Email,

                  Title: data.Title,
                  PhoneNumber: data.PhoneNumber,
                  Url: url,
                  ImageName: state.photo.name,
                  Date: Date().toLocaleString(),
                })
                .then((docRef) => {
                  setOpen(true);
                  setMessage({
                    success: "BOD profile have been updated!!",
                  });
                  setLoading(false);
                  setGreen(true);
                  setData({
                    FullName: "",
                    Title: "",
                    Email: "",
                    PhoneNumber: "",
                  });
                  history.push('./board-of-directors');
                  setState({
                    open: false,
                    photo: "",
                  });
                })
                .catch((error) => {
                  setOpen(true);
                  setMessage({
                    error: "Error updating BOD Profile: ",
                  });
                  setLoading(false);
                  setGreen(false);
                })
            )
            .catch((error) => {
              setMessage({ error: error });
            });
        }
      );
    }
  };

  return (
    <div className={classes.root}>
      <Navbar/>
      <div className={classes.image}>

      </div>
      <form className={classes.form} noValidate autoComplete="off">
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
        {state.photo ? (
          <div>
            <p>{state.photo.name}</p>
          </div>
        ) : (
          <></>
        )}

        <TextField
          id="standard-basic-Name"
          label="Full Name"
          value={data.FullName}
          fullWidth
          onChange={(event) => {
            const Name = event.target.value;
            setData((prevSetData) => ({
              FullName: Name,
              Title: prevSetData.Title,
              PhoneNumber: prevSetData.PhoneNumber,
              Email: prevSetData.Email,

              Url: prevSetData.Url,
            }));
          }}
        />
        <TextField
          id="standard-basic-Title"
          label="Title Position"
          value={data.Title}
          fullWidth
          onChange={(event) => {
            const title = event.target.value;
            setData((prevSetData) => ({
              FullName: prevSetData.FullName,
              Title: title,
              PhoneNumber: prevSetData.PhoneNumber,
              Email: prevSetData.Email,

              Url: prevSetData.Url,
            }));
          }}
        />

        <TextField
          id="standard-basic-Email"
          label="Email"
          value={data.Email}
          fullWidth
          onChange={(event) => {
            const email = event.target.value;
            setData((prevSetData) => ({
              FullName: prevSetData.FullName,
              Title: prevSetData.Title,
              PhoneNumber: prevSetData.PhoneNumber,
              Email: email,

              Url: prevSetData.Url,
            }));
          }}
        />
        <TextField
          id="standard-basic-Phone"
          label="Phone-Number"
          value={data.PhoneNumber}
          fullWidth
          onChange={(event) => {
            const phone = event.target.value;
            setData((prevSetData) => ({
              FullName: prevSetData.FullName,
              Title: prevSetData.Title,
              PhoneNumber: phone,
              Email: prevSetData.Email,
              Url: prevSetData.Url,
            }));
          }}
        />

        <div onClick={Edit()}>
          <BackDrop name={"Add"} type={green} loading={loading} />
        </div>
      </form>

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
