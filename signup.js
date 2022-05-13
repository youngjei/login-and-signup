// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
//Third module is optionable (only to save in realtime database)
import {
  getDatabase,
  ref,
  set,
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

// Sign up button is pressed

document.getElementById("signUp").addEventListener("click", function () {
  console.log("pressed");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordVerify = document.getElementById("pwverify").value;
  const username = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  const day = document.getElementById("day").value;
  const gender = document.getElementById("gender").value;
  const job = document.getElementById("job").value;

  set(ref(database, "test/"), {
    test: "test",
  });

  if (password == passwordVerify) {
    // User is created in Authentication section, under User
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Signed in
        set(ref(database, "users/" + user.uid), {
          username: username,
          email: email,
          admin: false,
          name: name,
          birthYear: year,
          birthMonth: month,
          birthDay: day,
          gender: gender,
          job: job,
        });
        //Alert user that sign up was successful
        console.log("Created!");
        alert("User Created!");
        location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode + errorMessage);
        alert(errorMessage);
      });
  } else {
    alert("Password does not match");
  }
});
