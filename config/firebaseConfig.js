// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqJcwmsb1DXwPT3-v-8G7MKpMmetSBIgk",  // Clé API depuis google-services.json
  authDomain: "cryptosyncs5.firebaseapp.com",  // Valeur par défaut pour Firebase
  projectId: "cryptosyncs5",  // Projet Firebase
  storageBucket: "cryptosyncs5.appspot.com",  // Stockage par défaut
  messagingSenderId: "14647391132",  // SenderId de ton projet
  appId: "1:14647391132:android:5b782a0c7ae33a38894e59",  // App ID de ton projet
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firestore };
