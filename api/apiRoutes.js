// const express = require('express') // Express for routing
// const path = require('path') // Path to handle file paths
// const fs = require('fs') // FS module for reading and writing files
// const router = express.Router() // Create an instance of Express Router

// // Login route
// router.post('/login', (req, res, next) => {
//   const { username, password } = req.body // Destructure username and password from the request body
//   // Read users data from the users.json file
//   fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
//     if (err) return next(err) // Pass any error to the error handling middleware
//     const users = JSON.parse(data) // Parse JSON data to get the user list
//     const user = users.find(u => u.username === username && u.password === password)// Find matching user
//     if (user) {
//       req.session.user = user;
//       // If user exists, redirect to the dashboard
//      // return res.status(302).redirect('/api/dashboard') // Redirect to dashboard.html
//      req.session.user = user.username;
//      return res.redirect('/api/dashboard');

      

//     } else {
//       // If user doesn't exist, redirect to the register page
//       return res.status(302).redirect('/api/register') // Redirect to register.html
//     }
//   })
// })

// // Register route
// router.post('/register', (req, res, next) => {
//   const { username, password } = req.body // Destructure username and password
//   const newUser = { username, password } // Create a new user object
//   // Read users data from the users.json file
//   fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
//     if (err) return next(err) // Pass any error to the error handling middleware
//     let users = []
//     if (data) {
//       users = JSON.parse(data) // Parse existing user data
//     }
//     users.push(newUser) // Add the new user to the users array
//     // Write the updated users array back to the JSON file
//     fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
//       if (err) return next(err)// Pass any error to the error handling middleware
//       res.status(302).redirect('/')// Redirect to login page after successful registration
//     })
//   })
// })

// module.exports = router // Export the router so it can be used in server.js


// routes/auth.js
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
