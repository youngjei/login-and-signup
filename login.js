// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//Third module is optionable (only to save in realtime database)
import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbdJpxGUjqMIRlUGshKJW9bOG1KzEIELk",
  authDomain: "test-ad597.firebaseapp.com",
  projectId: "test-ad597",
  storageBucket: "test-ad597.appspot.com",
  messagingSenderId: "606337331667",
  appId: "1:606337331667:web:ff531a29c9b075624aff26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Login button is pressed
document.getElementById("loginButton").addEventListener("click", function () {
  const email = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      //change bottom code to firestore
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: dt,
      });

      console.log("Successfully signed in!");
      alert("Successfully signed in!");
      location.href = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      alert(errorMessage);
    });
});
