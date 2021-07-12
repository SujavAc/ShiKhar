import React, {useState,useEffect,useContext} from "react";
import {useHistory} from 'react-router-dom';
import { useAuth } from '../../../Firebase/AuthProvider';
import './Login.scss'
import {Link} from 'react-router-dom';
// import Navigationbar from "../../../Website/Components/Navbar/Navbar";
// import Footer from "../../../Website/Components/Footer/Footer";
import Snackbar from '../../Website/Components/SnackBar/Snackbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({error:'',success:''});
    const [loading,setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const { login, gmailPopup, currentUser } = useAuth();


    const handleCloseSnackBar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };
      async function signInWithEmailAndPasswordHandler(event){
        event.preventDefault();
        if(!email || !password){
          setOpen(true);
          setMessage({error:'All field Required'});
        }
        try{
          setMessage({error:'',success:''});
          setLoading(true);
          await login(email,password)
          setOpen(true);
          setMessage({success:'Login Successfully'});
          history.push('/dashboard');
        }catch{
          setOpen(true);
          setMessage({error:'Failed to login, Try again!!!'});
        }
        setEmail("");
    setPassword("");
    setLoading(false);
      };

    //  async function signInWithGoogleHandler(e){
    //    e.preventDefault();
    //    try{
    //     setError('');
    //     setLoading(true);
    //     await gmailPopup()
    //     history.push('/dashboard');
    //   }catch{
    //     setError('Failed to login, Try again!!!');
    //   }
    //   setLoading(false);
    //  }
     
     React.useEffect(()=>{
       if (currentUser){
         history.push('/dashboard')
       }
     },[])
     return (
      <div id="login">
        <div className="loginform">
          <h3>Shikhar power</h3>
          <span>Admin Login</span>
          <div className="userpass">
          <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value = {email}
            placeholder="E.g: xyz@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <button className="bg-green-300 hover:bg-green-500 w-full py-2 text-black" onClick =  {signInWithEmailAndPasswordHandler}>
            Sign in
          </button>
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
        </form>
        <p className="text-center my-3">or</p>
        <p className="text-center my-3">
          <Link to = "passwordreset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
        </p>
          </div>
        </div>
      </div>
    );
  }
  export default Login;
