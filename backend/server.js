// backend/server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user'); // Correctly requiring the user routes
const admin = require('firebase-admin'); // Import Firebase Admin SDK

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to your Firebase services here (Firestore, Auth, etc.)

// Use user routes
app.use('/api/users', userRoutes); // Mounting the user routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
