// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqJcwmsb1DXwPT3-v-8G7MKpMmetSBIgk",
  authDomain: "cryptosyncs5.firebaseapp.com",
  projectId: "cryptosyncs5",
  storageBucket: "cryptosyncs5.appspot.com",
  messagingSenderId: "14647391132",
  appId: "1:14647391132:android:5b782a0c7ae33a38894e59",
};

// Initialiser Firebase une seule fois
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, firestore };
