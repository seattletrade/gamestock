import firebase from 'firebase/app';
import 'firebase/auth';

const fireApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_APII_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSEGING_SENDET_ID,
    appId: process.env.REACT_APP_APP_ID,
})

export const auth = fireApp.auth();
export default fireApp;

