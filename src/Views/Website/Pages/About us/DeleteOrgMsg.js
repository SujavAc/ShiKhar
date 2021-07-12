import React from "react";
import { fireStore, firebaseStorage } from "../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '../../Components/SnackBar/Snackbar'

const useStyles = makeStyles((theme) => ({
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function DeleteOrgMsg(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });
  const classes = useStyles();

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handelDelete = (id, name) => () => {
    firebaseStorage
      .ref()
      .child(`Stakeholder/${name}`)
      .delete()
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    fireStore
      .collection("OrgMessage")
      .doc(id)
      .delete()
      .then(() => {
        return setOpen(true), setMessage({ success: "delete successfully" });
      })
      .catch((error) => {
        setMessage({ error: "Error in deletion the image form gallery" });
      });
  };

  return (
    <div>
      <Button
        variant="contained" color="secondary"
        onClick={handelDelete(props.id, props.imgName)}
      >
        Delete
      </Button>
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

