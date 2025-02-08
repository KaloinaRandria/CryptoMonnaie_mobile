import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Ajout de l'authentification

const firebaseConfig = {
  apiKey: "AIzaSyDqJcwmsb1DXwPT3-v-8G7MKpMmetSBIgk",
  authDomain: "cryptosyncs5.firebaseapp.com",
  projectId: "cryptosyncs5",
  storageBucket: "cryptosyncs5.appspot.com",
  messagingSenderId: "14647391132",
  appId: "1:14647391132:android:5b782a0c7ae33a38894e59",
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialiser Firestore et Auth
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);  // Ajout de cette ligne

export { firebaseApp, firestore, auth };  // Export de `auth`
