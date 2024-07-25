import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUUDiYa64ExQm8PLECCU54VWL2Cj5wgB0",
  authDomain: "todo-mui-vk.firebaseapp.com",
  databaseURL: "https://todo-mui-vk-default-rtdb.firebaseio.com",
  projectId: "todo-mui-vk",
  storageBucket: "todo-mui-vk.appspot.com",
  messagingSenderId: "829070457688",
  appId: "1:829070457688:web:c24526d6cdbbb58e21032d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
