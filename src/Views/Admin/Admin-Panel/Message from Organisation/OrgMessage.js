import React from 'react';
import Snackbar from '../../../Website/Components/SnackBar/Snackbar';
import BackDrop from '../../../Website/Components/BackDrop/Backdrop';
import {fireStore,firebaseStorage} from '../../../../Firebase/config';
import { DropzoneDialog } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'column',
    justifyContent: "center",
      alignItems: "center",

    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
}));

export default function OrgMessage(){
    const[orgmsg,setOrgMsg] = React.useState({name:'',title:'',phone:'',email:'',message:''});
    const [state, setState] = React.useState({ open: false, photo: "" });
    const [message,setMessage] =React.useState({error:'',success:''});
    //snackbar
    const [open, setOpen] = React.useState(false);
    //Backdrop
    const [green, setGreen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const classes = useStyles();

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const handleOpen = () => {
        setState((prevSetData) => ({
          open: true,
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

      const handleClose = () => {
        setState((prevSetData) => ({
          open: false,
          photo: prevSetData.photo,
        }));
        console.log(state);
      };

      const handleCloseSnackBar = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
  
        setOpen(false);
      };

      const handleClick =(e)=>{
          e.preventDefault();
          setLoading(true);
          if(!orgmsg.title || !orgmsg.message || !orgmsg.email || !orgmsg.phone || !state.photo){
            setOpen(true);
            setMessage({error:'All fields are required'});
            setLoading(false);
          }
          else if (!pattern.test(orgmsg.email)) {
            setOpen(true);
            setMessage({
              error:'Not valid Email...!! Try again'
            });
            setLoading(false);

           
      }
      else{
        const img = state.photo;
      const uploadImage = firebaseStorage
        .ref(`Stakeholder/${img.name}`)
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
            .ref("Stakeholder")
            .child(img.name)
            .getDownloadURL()
            .then((url) =>
              fireStore
                .collection("OrgMessage")
                .add({
                  FullName: orgmsg.name,
                  Email: orgmsg.email,
                  Message: orgmsg.message,
                  PhoneNumber:orgmsg.phone,
                  Title:orgmsg.title,
                  Url: url,
                  Date:Date().toLocaleString(),
                  ImageRef:state.photo.name
                })
                .then((docRef) => {
                  setOpen(true);
                  setMessage({
                    success: "Thank you for your Message",
                  });
                  setLoading(false);
                  setGreen(true);
                  setOrgMsg({
                    name: "",
                    email: "",
                    message: "",
                    title: "",
                    phone:"",
                  });
                  setState((prevSetData)=>({
                    open:prevSetData.open,
                    photo:''
                  }))
                  setGreen(false);
                })
                .catch((error) => {
                  setMessage({
                    error: "Error writing document: ", error,
                  });
                  setLoading(false);
                  setGreen(false);
                })
            );
        }
      );
    }
      
    }


    return (
        <div style={{justifyContent:'center', alignContent:'center',display:'flex',flexDirection:'column'}}>
          <form className={classes.root} noValidate autoComplete="off">
            
          Add Photo
    
  
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
            value={orgmsg.name}
            onChange={(event) => {
              const Name = event.target.value;
              setOrgMsg((prevSetData)=>({
                name:Name,
                title:prevSetData.title,
                phone:prevSetData.phone,
                email:prevSetData.email,
                message:prevSetData.message
              }));
            }}
          />
          <TextField
            id="standard-basic-Title"
            label="Title"
            value={orgmsg.title}
            onChange={(event) => {
              const Title = event.target.value;
              setOrgMsg((prevSetData)=>({
                title:Title,
                phone:prevSetData.phone,
                email:prevSetData.email,
                message:prevSetData.message,
                name:prevSetData.name
              }));
            }}
          />
          <TextField
            id="standard-basic-Message"
            label="Message"
            value={orgmsg.message}
            onChange={(event) => {
              const Message = event.target.value;
              setOrgMsg((prevSetData)=>({
                title:prevSetData.title,
                phone:prevSetData.phone,
                email:prevSetData.email,
                message:Message,
                name:prevSetData.name
              }));
            }}
          />
          <TextField
            id="standard-basic-Email"
            label="Email"
            value={orgmsg.email}
            onChange={(event) => {
              const Email = event.target.value;
              setOrgMsg((prevSetData)=>({
                title:prevSetData.title,
                phone:prevSetData.phone,
                email:Email,
                message:prevSetData.message,
                name:prevSetData.name
              }));
            }}
          />
          <TextField
            id="standard-basic-Phone"
            label="Phone-Number"
            value={orgmsg.phone}
            onChange={(event) => {
              const Phone = event.target.value;
              setOrgMsg((prevSetData)=>({
                title:prevSetData.title,
                phone:Phone,
                email:prevSetData.email,
                message:prevSetData.message,
                name:prevSetData.name
              }));
            }}
          />
         
              <div onClick={handleClick} >
              <BackDrop name={'Submit'} type={green} loading={loading}/>
              </div>
          
          
          {message.error ? <Snackbar close={handleCloseSnackBar} state={open} message={(message.error)} type={'error'}/> : <Snackbar close={handleCloseSnackBar} state={open} message={(message.success)} type={'success'}/>}
        </form>
        </div>
        
        
      );
    }