// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blockedWebsites: { type: [String], default: [] } // Store user-specific blocked websites
});

module.exports = mongoose.model('User', userSchema);
