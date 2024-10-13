// popup.js
function loadFirebaseScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = (e) => reject(new Error(`Failed to load script ${url}`));
        document.head.appendChild(script);
    });
}

async function initFirebase() {
    try {
        await loadFirebaseScript('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
        await loadFirebaseScript('https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js');
        await loadFirebaseScript('https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js');

        // Now initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCDZxYxKiMhwKtDD4t7_mfxmTtR6H0hye4",
            authDomain: "lightweb-6d857.firebaseapp.com",
            projectId: "lightweb-6d857",
            storageBucket: "lightweb-6d857.appspot.com",
            messagingSenderId: "679588894396",
            appId: "1:679588894396:web:3223b45083952f12b4e2b9"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        // Now you can use Firebase services like Firestore and Auth
    } catch (error) {
        console.error("Error loading Firebase scripts: ", error);
    }
}

// Call the function to initialize Firebase
initFirebase();
