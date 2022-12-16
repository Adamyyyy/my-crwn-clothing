import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdDd9YDIRVgW9cKPwRkdDPSsO-0TcAzP8",
  authDomain: "crwn-clothing-db-e39de.firebaseapp.com",
  projectId: "crwn-clothing-db-e39de",
  storageBucket: "crwn-clothing-db-e39de.appspot.com",
  messagingSenderId: "937786975485",
  appId: "1:937786975485:web:7c9954c452ccdef298ca94",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
  // if user data not exists
  // create / set the document with the data from userAuth in my collection

  // If user data exists

  // return userDocRef
};
