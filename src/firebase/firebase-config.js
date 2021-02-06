import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnHv-JJ6D7_GvdIa_K0eCvs8P7STz3qeY",
    authDomain: "react-journal-app-jaimecamargo.firebaseapp.com",
    projectId: "react-journal-app-jaimecamargo",
    storageBucket: "react-journal-app-jaimecamargo.appspot.com",
    messagingSenderId: "538541088943",
    appId: "1:538541088943:web:01ef95a51adc747075345a"
};
//
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//
// referencia a la base de datos creada en firebase
const db = firebase.firestore();
//
// referencia al proveedor de autenticación de Google
// este debe estar habilitado en la consola de Firebase
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//
// exportamos las variable que vamos a utilizar desde otros scripts
export {
    db,
    googleAuthProvider,
    firebase
}