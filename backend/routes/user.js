// backend/routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../firebase'); // Import Firebase Admin
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userRecord = await admin.auth().createUser({
            email: username, // Use email as username
            password: password,
        });

        // Save additional user data in Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            username,
            blockedWebsites: [],
        });

        res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(username);

        // Verify password
        const isMatch = await bcrypt.compare(password, userRecord.passwordHash); // This assumes you handle hashed password storage
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ uid: userRecord.uid }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: userRecord });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sign in failed' });
    }
});

// Update blocked websites route
router.post('/update-blocked', async (req, res) => {
    const { uid, blockedWebsites } = req.body; // Use uid instead of username

    try {
        await admin.firestore().collection('users').doc(uid).update({ blockedWebsites });

        res.json({ message: 'Blocked websites updated', blockedWebsites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update blocked websites' });
    }
});

module.exports = router;
