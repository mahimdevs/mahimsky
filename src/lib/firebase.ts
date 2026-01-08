import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase config from Firebase Console
// Go to: Firebase Console > Project Settings > Your Apps > Web App
const firebaseConfig = {
  apiKey: "AIzaSyBKml64bDa_AI8IpK22ZgTJ9jOxS3l3tRc",
  authDomain: "mahimskyweb.firebaseapp.com",
  projectId: "mahimskyweb",
  // Firebase expects the bucket name (typically <project-id>.appspot.com)
  storageBucket: "mahimskyweb.appspot.com",
  messagingSenderId: "12854657898",
  appId: "1:12854657898:web:0b7a3dfa12080ea6c95b13",
  measurementId: "G-EYEC6ZHHCG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
