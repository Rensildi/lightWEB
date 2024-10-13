// backend/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Replace with your path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lightWEB.firebaseio.com" // Replace with your Firebase database URL
});

module.exports = admin;
