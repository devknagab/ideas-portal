import { initializeApp } from "firebase/app"; // creates firebase connection
import { getFireStore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdnvxgQ2bbhKaKDyLmZoyOWwenws5MFsg",
  authDomain: "ideas-portal-8bb61.firebaseapp.com",
  databaseURL: "https://ideas-portal-8bb61-default-rtdb.firebaseio.com",
  projectId: "ideas-portal-8bb61",
  storageBucket: "ideas-portal-8bb61.appspot.com",
  messagingSenderId: "409285207097",
  appId: "1:409285207097:web:82a4173dd9aee0aa55d9e8",
  measurementId: "G-CLW063LBY3",
};

// establish firebase connection
const app = initializeApp(firebaseConfig);

export const db = getFireStore(app);
