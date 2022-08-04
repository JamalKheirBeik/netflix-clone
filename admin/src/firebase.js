import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9naN9DORc-fzOb99uzdDOhO-rUbVKa9Y",
  authDomain: "netflix-d689e.firebaseapp.com",
  projectId: "netflix-d689e",
  storageBucket: "netflix-d689e.appspot.com",
  messagingSenderId: "725435453787",
  appId: "1:725435453787:web:5c38713d1a05968adf0a7e",
  measurementId: "G-EHS2VCNDVT",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
