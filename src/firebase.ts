import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TVUJ_API_KEY",
  authDomain: "TVUJ_AUTH_DOMAIN",
  projectId: "TVUJ_PROJECT_ID",
  storageBucket: "TVUJ_STORAGE_BUCKET",
  messagingSenderId: "TVUJ_MESSAGING_SENDER_ID",
  appId: "TVUJ_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
