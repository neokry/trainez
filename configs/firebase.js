import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAYTFtql07Xba0XDGOHgQnvQhCbo8VcHiw",
    authDomain: "trainez-a0455.firebaseapp.com",
    databaseURL: "https://trainez-a0455.firebaseio.com",
    projectId: "trainez-a0455",
    storageBucket: "trainez-a0455.appspot.com",
    messagingSenderId: "131093028525",
    appId: "1:131093028525:web:84d75cd44bbfad87e9b024",
    measurementId: "G-KSYR4ZE3PD",
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
    }
}

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectAuth, projectFirestore };
