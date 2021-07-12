import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

// import PropTyes from 'prop-types';
const DialogBox = (props) => {
  const handleClose = () => {
    props.clearOnClose && props.clearEditStatus();
    props.handleClose();
  };

  return (
    <Dialog
      // {...props}
      fullWidth={props.fullWidth}
      maxWidth={props.maxWidth}
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Actions</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.Message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.button1click} color="primary">
          {props.button1}
        </Button>
        <Button onClick={props.button2click} color="primary">
          {props.button2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;