import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { firebaseStorage, fireStore } from "../../../../Firebase/config";
import Snackbar from '../../../Website/Components/SnackBar/Snackbar';
import BackDrop from '../../Components/BackDrop/Backdrop';
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

export default function News() {
    const classes = useStyles();
    const [news, setNews] = useState({
      title: "",
      description: "",
    });
    const [url,setUrl] = React.useState();
    const [newsdata, setNewsData] = React.useState([]);
   
    const [state, setState] = useState({ open: false, photo: "" });
    const [msg, setMsg] = useState({ Error: "", Success: "" });
    const [open, setOpen] = React.useState(false);
    const [doc,setDoc] = React.useState();
    const[update,setUpdate] = React.useState(false);
    //backdrop
    const [green,setGreen]= useState(false);
    const [loading, setLoading] = React.useState(false);
  
  const handleUpdateValue =()=>{
      
  };

    React.useEffect(() => {
        fireStore.collection("News").onSnapshot(onCarouselUpdate);
      }, [newsdata]);
    
      const onCarouselUpdate = (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { Title, Description, Url } = doc.data();
          data.push({
            key: doc.id,
            doc,
            Title,
            Description,
            Url,
          });
        });
        setNewsData(data);
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
        !news.title ||
        !news.description
        
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
              .ref(`News/${img.name}`)
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
                  .ref("News")
                  .child(img.name)
                  .getDownloadURL()
                  .then((url) =>
                  
                        fireStore
                        .collection("News")
                        .doc(doc)
                        .update({
                            Title:news.title,
                            Description:news.description,
                            Url:url,
                            Date:Date().toLocaleString(),
                        })
                        .then((docRef) => {
                          setOpen(true);
                          setMsg({
                            Success: "News have been updated!!",
                          });
                          setLoading(false);
                          setGreen(true);
                          setNews({
                            title: "",
                            description: "",
                        });
                          setUrl('');
                          setDoc('');
                          setState({open:false, photo:''});
                          
                        })
                        .catch((error) => {
                          setOpen(true);
                          setMsg({
                            Error: "Error writing News: ", error,
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
                        .collection("News")
                        .doc(doc)
                        .update({
                            Title:news.title,
                            Description:news.description,
                            Url:url,
                            Date:Date().toLocaleString(),
                        })
                        .then((docRef) => {
                          setOpen(true);
                          setMsg({
                            Success: "News have been updated!!",
                          });
                          setLoading(false);
                          setGreen(true);
                          setNews({
                            title: "",
                            description: "",
                        });
                          setUrl('');
                          setDoc('');
                          setState({open:false, photo:''});

                          
                        })
                        .catch((error) => {
                          setOpen(true);
                          setMsg({
                            Error: "Error writing News: ", error,
                          });
                          setLoading(false);
                          setGreen(false);
                        })
                      
                  
                    
                  
          }
          else{
            const img = state.photo;
            const uploadImage = firebaseStorage
              .ref(`News/${img.name}`)
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
                  .ref("News")
                  .child(img.name)
                  .getDownloadURL()
                  .then((url) =>
                    fireStore
                      .collection("News")
                      .add({
                        Title:news.title,
                        Description:news.description,
                        Url:url,
                        Date:Date().toLocaleString(),
                      })
                      .then((docRef) => {
                        setOpen(true);
                        setMsg({
                          Success: "News have been successfully Added!!",
                        });
                        setLoading(false);
                        setGreen(true);
                        setNews({
                            title: "",
                            description: "",
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
          }
        
    };
  
   

    return (
      <div style={{justifyContent:'center', alignContent:'center',display:'flex',flexDirection:'column'}}>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-select-news"
          select
          label="Edit News"
          helperText="Please select news from list to update it"
          defaultValue=""
          
          
        >
          {newsdata.map((option) => (
            <MenuItem key={option.key}  value={''}
            onClick={()=>{
                setNews({title:option.Title,description:option.Description});
                setUrl(option.Url);
            setUpdate(true);
            setDoc(option.key);
            
        }}
            >
              {option.Title}
            </MenuItem>
          ))}
        </TextField>   
        Create News
        <TextField
          id="standard-basic-title"
          label="Title"
          value={news.title}
          onChange={(event) => {
            const Title = event.target.value;
            setNews((prevSetData) => ({
              title:Title,
              description:prevSetData.description
            }));
          }}
        />
        <TextField
          id="standard-basic-description"
          label="Description"
          value={news.description}
          onChange={(event) => {
            const Description = event.target.value;
            setNews((prevSetData) => ({
                title:prevSetData.title,
                description:Description
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
  