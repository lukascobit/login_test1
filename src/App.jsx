import React, { useEffect, useState } from 'react'
import "./App.css"
import firebase from 'firebase'
import "firebase/firestore"
import "firebase/auth"
import logo from "./usercle_logo.png"

import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import Chat from './components/Chat'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_I,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  })
}else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth()
const firestore = firebase.firestore()


function App() {

  const [user] = useAuthState(auth)

  return (
    <div>
      <h1 onClick={()=> window.location = "/"} className="logoText"><img className="logo" src={logo} alt=""/>Usercle</h1>
      {user ? <Home/> : <Signup/>}
    </div>
  )
}
function Signup() {

  function signinWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <div>
      <button onClick={signinWithGoogle} className="signin">Signin with google</button>
    </div>
  )
}
function Home() {
  return (
      <div>
          {auth.currentUser ? <Signout auth={auth}/> : <p>you arent logged in</p>}
      </div>
  )
}
function Signout() {
  return (
    <div>
      <div className="userCorner">
          <h1 className="usernameCorner"><img className="pfp" src={auth.currentUser.photoURL} alt=""/> {auth.currentUser.displayName}</h1>
          <h2>{auth.currentUser.email}</h2>
          <button className="signOut" onClick={()=> auth.signOut()}>sign out</button>
      </div>
      <Chat auth={auth.currentUser && auth}/>
    </div>
  )
}


export default App
