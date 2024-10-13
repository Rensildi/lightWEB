// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDZxYxKiMhwKtDD4t7_mfxmTtR6H0hye4",
  authDomain: "lightweb-6d857.firebaseapp.com",
  projectId: "lightweb-6d857",
  storageBucket: "lightweb-6d857.appspot.com",
  messagingSenderId: "679588894396",
  appId: "1:679588894396:web:3223b45083952f12b4e2b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signupButton = document.getElementById('signupButton');
const signinButton = document.getElementById('signinButton');

signupButton.addEventListener('click', async () => {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;
        alert('User created successfully!'); // Alert for success
        // Optionally, you can add user data to Firestore here
    } catch (error) {
        console.error('Error during sign up:', error);
        alert(error.message); // Alert for error
    }
});

signinButton.addEventListener('click', async () => {
    const username = document.getElementById('signinUsername').value;
    const password = document.getElementById('signinPassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;
        alert('Sign in successful!'); // Alert for success
        // You can now access Firestore and do operations
    } catch (error) {
        console.error('Error during sign in:', error);
        alert(error.message); // Alert for error
    }
});

document.getElementById("blockButton").addEventListener("click", () => {
    const websites = ["example.com", "anotherexample.com"]; // Replace with actual input from the user
    chrome.runtime.sendMessage({ action: "updateBlockedWebsites", websites: websites }, (response) => {
        if (response.success) {
            console.log("Websites updated successfully.");
        } else {
            console.error("Failed to update websites.");
        }
    });
});
