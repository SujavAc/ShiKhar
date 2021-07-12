import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import {fireStore} from '../../../../Firebase/config';
import Button from '@material-ui/core/Button' ;
import Input from '@material-ui/core/Input';
import DialogBox from '../../../Website/Components/DialogBox/DialogBox';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackBar from '../../../Website/Components/SnackBar/Snackbar';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  backdrop:{
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      display:'overlay',
      color: '#3d5afe',
    },
  },
}));

export default function BottomAppBar() {
  const [Enquiry,setEnquiry]=React.useState([]);
  const [filter,setFilter] = React.useState('');
  const [status,setStatus]= React.useState('');
  const [stat,setStat]= React.useState('');
  const [dialogopen,setDialogopen]=React.useState(false);
  const [backdrop, setBackdrop] = React.useState(false);
  const [key,setKey]=React.useState('');
  const [snackbar, setSnackbar] = React.useState(false);
  const [message,setMessage] = React.useState({error:'',success:''})
  const classes = useStyles();

  React.useEffect(()=>{
      if(filter){
        // fireStore.collection('ContactUs').where('FullName','==',filter).onSnapshot(onCollectionUpdate);
        fireStore.collection('ContactUs').orderBy('FullName').startAt(filter).endAt(filter+'\uf8ff').onSnapshot(onCollectionUpdate)
      }else if(status){
        fireStore.collection('ContactUs').where('Status','==',status).onSnapshot(onCollectionUpdate);
      }else{
        fireStore.collection('ContactUs').onSnapshot(onCollectionUpdate);
      }
      
  },[Enquiry])
  const onCollectionUpdate = (querySnapshot) =>{
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Email,FullName, Message, Phone_Number,Date,Status} = doc.data();
      data.push({
        key: doc.id,
        doc,
        Email,FullName, Message, Phone_Number,Date,Status
      });
    });
    setEnquiry(data);
  
  }
  const handleOpen = (key,stat) => ()=>{
      setDialogopen(true);
      setKey(key);
      setStat(stat);
  }
  const handleClose = ()=>{
    setDialogopen(false);
}
const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

const handleDelete = () =>{
  setDialogopen(false);  
  setBackdrop(true);
    
    fireStore.collection('ContactUs').doc(key).delete().then((docRef)=>{
        
        setSnackbar(true);
        setBackdrop(false);
        setMessage({success:'Successfully Deleted'});
        setKey('');
    }).catch((error)=>{
        setMessage({error:'Error occur while deleting, please try again',error});
    });
    
}
function handleMarkAsRead(){
  setDialogopen(false);
  setBackdrop(true);
    fireStore.collection('ContactUs').doc(key).update({
        "Status":'read'
    }).then((docRef)=>{
        
        setSnackbar(true);
        setBackdrop(false);
        setMessage({success:'read Successfully'});
        setKey('');
        setStatus('');

    }).catch((error)=>{
        setMessage({error:'Error occur while deleting, please try again',error});
    });
}
function handleMarkAsUnRead(){
  setDialogopen(false);
  setBackdrop(true);
  fireStore.collection('ContactUs').doc(key).update({
      "Status":'unread'
  }).then((docRef)=>{
      
      setSnackbar(true);
      setBackdrop(false);
      setMessage({success:'Unread Successfully'});
      setKey('');
  }).catch((error)=>{
      setMessage({error:'Error occur while deleting, please try again',error});
  });
}


  return (
    <div>
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        
        <Typography className={classes.text} variant="h5" gutterBottom style={{display:'flex',justifyContent:'space-between',}}> 
          Search
          <div>
          <Input value={filter} placeholder="By Name:" onChange={(e)=>{setFilter(e.target.value)}} />
          </div>
        </Typography>
        <div align="right">
        <Button onClick={()=>{setStatus('read')}}>Read Messages</Button>
        <Button onClick={()=>{setStatus('unread')}}>UnRead Messages</Button>
        </div>
       
        
        <List className={classes.list}>
          {Enquiry.map((data) => (
            <React.Fragment key={data.key}>
              
              <ListItem button onClick={handleOpen(data.key,data.Status)}>
              
                <ListItemAvatar>
                  <Avatar alt={data.FullName} src={data.FullName} />
                 
                </ListItemAvatar>
                <ListItemText primary={data.FullName} secondary={data.Message}/>
                {data.Status}
                
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <DialogBox 
      open={dialogopen}
      Message={'Delete or Mark as Read, if deleted you will never see it again. if you mark as read, can be display later'}
      handleClose={handleClose}
      button1={'Delete'}
      button2={stat=='read' ? ('Mark as UnRead'):('Mark as Read')}
      button1click={handleDelete}
      button2click={stat=='read'? (handleMarkAsUnRead ):(handleMarkAsRead)}
      />
     <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {message.error ? <SnackBar close={handleCloseSnackBar} state={snackbar} message={(message.error)} type={'error'}/> : <SnackBar close={handleCloseSnackBar} state={snackbar} message={(message.success)} type={'success'}/>}
    </React.Fragment>
    
    </div>
  );
}