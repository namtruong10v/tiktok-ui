import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

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
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();

export const analytics = getAnalytics(app);

export function useAuth() {
  const [currentUser, seCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => seCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;

}



// storage
export async function upload(file, currentUser, setLoading, nameUser) {

  console.log(file, currentUser, setLoading, nameUser, 'thông tin upload')
  const fileRef = ref(storage, `images/${currentUser.uid}${file.name}`);
  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {
    photoURL: photoURL,
    displayName: nameUser,
  });

  setLoading(false);


  window.location.href = '/profile'
}

export async function uploadVideo(file, setLoading) {
  const fileRef = ref(storage, `videos/${file.name}${Math.random()} `);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const urlVideo = await getDownloadURL(fileRef);

  setLoading(false);
  return urlVideo;
}

const postVideos = collection(firestore, "postVideo")

// upload Video 

export async function writeUpdateVideo(fileUpdate) {
  const docData = fileUpdate;
  try {

    await addDoc(postVideos, docData);
    console.log('upload video thanh cong')
  }
  catch (error) {
    console.log('co loi', error)
  }

}

export default app;

