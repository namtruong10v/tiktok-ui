// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage ,ref, uploadBytes } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { async } from "@firebase/util";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPX7gFZy8XXYLfopuYQJZehesEGLkrMx8",
  authDomain: "tiktok-ui-d0849.firebaseapp.com",
  projectId: "tiktok-ui-d0849",
  storageBucket: "tiktok-ui-d0849.appspot.com",
  messagingSenderId: "1090454386712",
  appId: "1:1090454386712:web:a4795eabf0668dd48eab6d",
  measurementId: "G-JN41BLZF5J"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage()

export const analytics = getAnalytics(app);

export function useAuth(){
  const [currentUser, seCurrentUser] = useState();

  useEffect( ()=> {
    const unsub = onAuthStateChanged(auth, user => seCurrentUser(user));
    return unsub;
  },[])
  return currentUser;
}

export function signUp(email, password){
  return createUserWithEmailAndPassword (auth,email,password);
}
export function login(email, password) {
  return signInWithEmailAndPassword (auth,email,password);

}

export function logout(){
  return signOut(auth);
}


// storage
export async function upload(file,currentUser , setLoading ,nameUser) {
  const fileRef = ref(storage , currentUser.uid + '.png');
  setLoading(true);

  const snapshot = await uploadBytes(fileRef,file);
 const photoURL = await getDownloadURL(fileRef);
 console.log(photoURL,'photoURL')

  updateProfile(currentUser, {
    photoURL:photoURL,
    displayName: nameUser,
  })
  setLoading(false);

  
   window.location.href='/profile'
}

export async function uploadVideo(file,currentUser,setLoading) {
    const fileRef = ref(storage ,`videos/${file.name}${Math.random()} `);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef,file);
    const urlVideo = await getDownloadURL(fileRef);
    
  setLoading(false);
 return urlVideo;
}

const firestore = getFirestore();
const specialOfTheDay = doc(firestore,'user/videos/');
const postVideos = collection(firestore,"postVideo")

// upload Video 

export async function writeUpdateVideo(fileUpdate){
  const docData = fileUpdate;
  try{

    await addDoc(postVideos, docData);
    console.log('upload video thanh cong')
  }
  catch(error){
    console.log('co loi',error)
  }

}

export default app;

