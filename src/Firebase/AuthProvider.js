import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../Firebase/config';
import firebase from 'firebase';

const AuthContext = React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){

    const [currentUser,setcurrentUser] = useState();
    const [loading,setLoading]= useState(true);

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut()
    }
    function resetpassword(email){
        return auth.sendPasswordResetEmail(email);
    }
    function gmailPopup(){
        const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
    auth.signInWithPopup(provider);
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setcurrentUser(user); 
            setLoading(false);
             
        })
        return unsubscribe
    },[])

    const value={
        currentUser,
        login,
        signup,
        logout,
        resetpassword,
        gmailPopup
    }
    return(
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    )
}