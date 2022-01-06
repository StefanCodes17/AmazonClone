import { initializeApp } from "firebase/app"
import { collection, getDocs, doc, QuerySnapshot, getFirestore, setDoc, updateDoc, addDoc, getDoc, collectionGroup } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCn2zAk4c16t9EYl1SDA9GwXxGVuKYjOj0",
    authDomain: "clone-2da43.firebaseapp.com",
    projectId: "clone-2da43",
    storageBucket: "clone-2da43.appspot.com",
    messagingSenderId: "639589129608",
    appId: "1:639589129608:web:469fc52cd670ced650ae3d",
    measurementId: "G-3HZYBR9MDE"
  };

const app = initializeApp(firebaseConfig)

export {collection, setDoc, getDocs, getDoc, doc, QuerySnapshot, getFirestore, updateDoc, addDoc, collectionGroup};