import { initializeApp } from "firebase/app"
import { 
  collection, 
  getDocs, 
  doc, 
  QuerySnapshot, 
  getFirestore, 
  setDoc, 
  updateDoc, 
  addDoc, 
  getDoc, 
  collectionGroup,
  orderBy } from "firebase/firestore"; 

  const firebaseConfig = {
    apiKey: "AIzaSyBMn6NixVVBKyNsMHAwNT1ktat8FmcY3lQ",
    authDomain: "i-crossbar-337501.firebaseapp.com",
    projectId: "i-crossbar-337501",
    storageBucket: "i-crossbar-337501.appspot.com",
    messagingSenderId: "184243922970",
    appId: "1:184243922970:web:50de6150319088c11189a3",
    measurementId: "G-VBWDZ9MH5W"
  };

const app = initializeApp(firebaseConfig)

export {orderBy, collection, setDoc, getDocs, getDoc, doc, QuerySnapshot, getFirestore, updateDoc, addDoc, collectionGroup};