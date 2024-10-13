// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Make sure this path is correct
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Make sure to define this in your .env file

// Sign up route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });

        // Save the user to the database
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
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sign in failed' });
    }
});

// Export the router
module.exports = router;
