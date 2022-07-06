// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBqTyIEX7dxcB2oTSjoq4qwJIbbFmYieEs", //process.env.API_KEY
  authDomain: "reacttest-b7b01.firebaseapp.com",
  databaseURL: "https://reacttest-b7b01-default-rtdb.firebaseio.com",
  projectId: "reacttest-b7b01",
  storageBucket: "reacttest-b7b01.appspot.com",
  messagingSenderId: "255734275252",
  appId: "1:255734275252:web:2c110787befb168ef78be1",
  measurementId: "G-1YMR1W9XL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const baseURL=firebaseConfig.databaseURL

export {baseURL, auth}