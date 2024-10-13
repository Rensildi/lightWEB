const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/auth'); // Correctly requiring the user routes

const app = express();
const PORT = process.env.PORT || 5000;

// dotenv requirement
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/content-blocker')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Use user routes
app.use('/api/users', userRoutes); // Mounting the user routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
