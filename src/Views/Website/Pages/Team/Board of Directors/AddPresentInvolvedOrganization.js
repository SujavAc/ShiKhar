import React from "react";
import { fireStore, firebaseStorage } from "../../../../../Firebase/config";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
//import { Snackbar } from "@material-ui/core";
import BackDrop from "../../../Components/BackDrop/Backdrop";
import Snackbar from '../../../Components/SnackBar/Snackbar';
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

export default function AddInvolvedOrganization(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ error: "", success: "" });
  
  const [form1, setForm1] = React.useState(null);
  
  const [green, setGreen] = React.useState(false);
  const [data, setData] = React.useState({
    
    Title:"",
    
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

  


 
  const handleMenuClose = () => {
    setForm1(null);
  };

  const handelEdit = (event) => {
    setForm1(event.currentTarget);
    
  };
  const Edit=() => (e) => {
    e.preventDefault();
    if (!loading) {
      setGreen(false);
      setLoading(true);
    }
    if ( !data.Title || !props.ID){
      setOpen(true);
      setMessage({
        error: "fill all the details",
      });
      console.log(data);

      setLoading(false);
      setGreen(false);
    } else {
      
       

          
            
           
                fireStore
                  .collection("Present Organization")
                  .add({
                    ID: props.ID,
                    
                    
                    Title:data.Title,
                   
                    Date: Date().toLocaleString(),
                  })
                  .then((docRef) => {
                    setOpen(true);
                    setMessage({
                      success: "BOD previous org have been Added!!",
                    });
                    setLoading(false);
                    setGreen(true);
                    setForm1(null);
                  })
                  .catch((error) => {
                    setOpen(true);
                    setMessage({
                      error: "Error updating BOD previous work: ",
                      error,
                    });
                    setLoading(false);
                    setGreen(false);
                  })
              
          }
        
      
    
               
        
    
    
  };

  return (
    <div id="add involveorg">
      <Button aria-controls="simple-menu" variant="contained" onClick={handelEdit}>
      <AddIcon/>
      </Button>
      <Menu id="simple-menu" anchorEl={form1} keepMounted open={Boolean(form1)} onClose={handleMenuClose} PaperProps={{
          style: {
            
            width: '30ch',
          }
        }}
        >
      <form className={classes.root} noValidate autoComplete="off">
        
        <TextField
            id="filled-multiline-flexible"
            label="Description"
            defaultValue={data.Title}
            multiline
            rows={4}
            onChange={(event) => {
              const title = event.target.value;
              setData((prevSetData)=>({
               
                Title:title,
                
              }));
            }}
          />
          

        <div onClick={Edit()}>
          <BackDrop name={"Add"} type={green} loading={loading} />
        </div>
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
