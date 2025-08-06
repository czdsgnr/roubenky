// src/firebase/firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB9QzqXzBBZmTBQNJpP9_XQi5DRrlFOvTQ",
  authDomain: "roubenky-f603c.firebaseapp.com",
  projectId: "roubenky-f603c",
  storageBucket: "roubenky-f603c.appspot.com",
  messagingSenderId: "1092370973976",
  appId: "1:1092370973976:web:YOUR_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;