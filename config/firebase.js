import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExpoPushTokenAsync } from "expo-notifications";

// 🔥 Ta configuration Firebase (remplace avec tes valeurs)
const firebaseConfig = {
  apiKey: "TA_CLE_API",
  authDomain: "ton-projet.firebaseapp.com",
  projectId: "notif-test-firebase",
  storageBucket: "ton-projet.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "1:695290924588:android:f16c6f3c2e87bcdf0c0b89",
};

// ✅ Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialisation de l'authentification avec stockage persistant
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialisation de Firestore (base de données)
const db = getFirestore(app);

// ✅ Initialisation de Firebase Cloud Messaging
const messaging = getMessaging(app);

export { app, auth, db, messaging };
