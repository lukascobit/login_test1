import firebase from "firebase";
import "firebase/auth"


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_SENDER_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export const auth = app.auth()
export default app