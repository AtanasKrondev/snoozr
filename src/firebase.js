import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA72U8F4TbH4PZee0-gJe20r6thKh9BaN8",
    authDomain: "snooz-r.firebaseapp.com",
    databaseURL: "https://snooz-r.firebaseio.com",
    projectId: "snooz-r",
    storageBucket: "snooz-r.appspot.com",
    messagingSenderId: "358031007702",
    appId: "1:358031007702:web:2f4646d475ae7ae435ce77"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const auth = firebase.auth();
export const fieldValue = firebase.firestore.FieldValue;
export const timeStamp = firebase.firestore.Timestamp;
export const usersRef = db.collection('users');
export const boardsRef = db.collection('boards');
export const listsRef = db.collection('lists');
export const tasksRef = db.collection('tasks');
export const commentsRef = db.collection('comments');