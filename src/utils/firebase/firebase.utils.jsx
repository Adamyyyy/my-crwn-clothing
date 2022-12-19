import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
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

// setup provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// auth
export const auth = getAuth();

// setup Google auth Popup and Redirect
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// setup FireStore
export const db = getFirestore();

// setup create user to db
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

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
        ...additionalInformation,
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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
