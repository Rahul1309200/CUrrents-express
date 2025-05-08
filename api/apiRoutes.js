const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../models/userModel'); // Import the User model
const router = express.Router();

// Login route
router.post('/login', (req, res, next) => {
  const { username, password } = req.body; // Destructure username and password from the request body
  
  // Find user in the MongoDB database
  User.findOne({ username, password })
    .then(user => {
      if (user) {
        req.session.user = user; // Store the user in the session
        req.session.user = user.username;
        return res.redirect('/api/dashboard'); // Redirect to dashboard
      } else {
        return res.status(302).redirect('/api/register'); // Redirect to register if user not found
      }
    })
    .catch(err => next(err)); // Handle any errors
});

// Register route
router.post('/register', (req, res, next) => {
  const { username, password } = req.body; // Destructure username and password
  const newUser = new User({ username, password }); // Create a new user instance

  // Save the new user to the MongoDB database
  newUser.save()
    .then(() => {
      res.status(302).redirect('/'); // Redirect to login page after successful registration
    })
    .catch(err => next(err)); // Handle any errors (e.g., if the username is already taken)
});

module.exports = router; // Export the router so it can be used in the server.js
