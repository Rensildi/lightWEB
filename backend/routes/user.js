// backend/routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'User registration failed' });
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sign in failed' });
    }
});

// Update blocked websites route
router.post('/update-blocked', async (req, res) => {
    const { username, blockedWebsites } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { username },
            { blockedWebsites },
            { new: true } // Return the updated document
        );

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'Blocked websites updated', blockedWebsites: user.blockedWebsites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update blocked websites' });
    }
});

module.exports = router;
