import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFo3mX3lTwlAk5JjYBTsnNLPVq2Nuy8dQ",
  authDomain: "react-native-42977.firebaseapp.com",
  projectId: "react-native-42977",
  storageBucket: "react-native-42977.firebasestorage.app",
  messagingSenderId: "640915441568",
  appId: "1:640915441568:web:3277ac46c27c212b9e06c5",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
