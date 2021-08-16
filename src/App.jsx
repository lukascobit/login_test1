import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import "firebase/firestore"
import "firebase/auth"
import Home from "./components/Home"
import Signup from "./components/Signup"

import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import { Simulate } from 'react-dom/test-utils'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_I,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

const auth = firebase.auth()
const firestore = firebase.firestore()


function App() {

  const [user] = useAuthState(auth)

  return (
    <div>
      {user ? <Home/> : <Signup/>}
    </div>
  )
}

export default App
