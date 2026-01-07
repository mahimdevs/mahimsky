import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config from Firebase Console
// Go to: Firebase Console > Project Settings > Your Apps > Web App
const firebaseConfig = {
  apiKey: "AIzaSyBKml64bDa_AI8IpK22ZgTJ9jOxS313tRc",
  authDomain: "mahimskyweb.firebaseapp.com",
  projectId: "mahimskyweb",
  storageBucket: "mahimskyweb.firebasestorage.app",
  messagingSenderId: "12854657898",
  appId: "1:12854657898:web:0b7a3dfa12080ea6c95b13",
  measurementId: "G-EYEC6ZHHCG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
