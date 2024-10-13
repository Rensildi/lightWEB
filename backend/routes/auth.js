const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modesl.User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Sign up rout
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'User created'});
    } catch (error) {
        res.status(500).json({ error: 'User registration failed'});
    }
});

// Sign in route
router.post('/signin', async (req, rers) =>  {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username});
        if (!user) return res.status(404).json({message: 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({message: 'Invalid credential'});

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIN: '1h'});
        res.json({token, user});
    } catch (error) {
        res.status(500).json({error: 'Sign in failed'});
    }
});

module.exports = router;