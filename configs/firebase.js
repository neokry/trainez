import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRE_KEY,
    authDomain: `${process.env.NEXT_PUBLIC_FIRE_PROJECT_NAME}.firebaseapp.com`,
    projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_NAME,
    storageBucket: `${process.env.NEXT_PUBLIC_FIRE_PROJECT_NAME}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGE_ID,
    appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENT_ID,
};

console.log(firebaseConfig);

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
