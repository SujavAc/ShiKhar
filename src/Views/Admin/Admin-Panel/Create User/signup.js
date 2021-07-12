import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import {auth} from '../../../../firebase/config';
import {useAuth} from '../../../../Firebase/AuthProvider';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState('');
  const [loading,setLoading]= useState(false);
  const history = useHistory();
  const { signup, gmailPopup, currentUser } = useAuth();

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
   async function createUserWithEmailAndPasswordHandler(e) {
    e.preventDefault();
    if(!email || !password || !displayName){
      setError('Fill all the details');
    }
    try{
      setError('');
      setLoading(true);
      await signup(email,password)
      history.push('/dashboard');
  }catch{
    setError('failed to create the account');
  }
    
    setEmail("");
    setPassword("");
    setDisplayName("");
    setLoading(false);
  };
  async function signInWithGoogleHandler(e){
    e.preventDefault();
    try{
     setError('');
     setLoading(true);
     await gmailPopup()
     history.push('/dashboard');
   }catch{
     setError('Failed to login, Try again!!!');
   }
   setLoading(false);
  }
  // useEffect(()=>{
  //   if(!currentUser){
  //     history.push('/spadmin')
  //   }else{
  //     history.push('/spadmin')
  //   }
  // })
  return (
    <div className="mt-8">
      
      <h1 className="text-3xl mb-2 text-center font-bold">Create Account</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-blue-600 w-full text-blue text-center mb-3">
            {error}
          </div>
        )}
        <form style={{display:'flex',flexDirection:'column'}}>
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="Your Name"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: xyz@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <button
          disabled={loading}
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={createUserWithEmailAndPasswordHandler}
          >
            Sign up
          </button>
        </form>
        {/* <p className="text-center my-3">or</p> */}
        {/* <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white" onClick={signInWithGoogleHandler}
        >
          Sign In with Google
        </button> */}
        
      </div>
      
    </div>
  );
};
export default SignUp;