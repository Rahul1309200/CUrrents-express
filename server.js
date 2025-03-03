const express = require('express') // Express for routing and middleware management
const path = require('path') // Path to handle file paths
const app = express()

const morgan=require('morgan')//color codes to the status code
app.use(morgan('dev'))
const helmet=require('helmet')
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        imgSrc: ["'self'", "data:", "https://github.com/", "https://raw.githubusercontent.com/", "https://sustainable.chitkara.edu.in/", "https://st4.depositphotos.com/", "https://images4.alphacoders.com/"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/"],
        fontSrc: ["'self'", "https://fonts.gstatic.com/"],
      },
    },
  })
);
 // Protects against common vulnerabilities

const cors = require('cors');
app.use(cors()); // Enable all origins (for APIs)


const PORT = 8080
// Import middlewares
const logger = require('./middlewares/logger') // Import logger middleware
const errorHandler = require('./middlewares/errorHandler') // Import error handler middleware
// Middleware to handle JSON and URL-encoded data in POST requests
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data
// Use logger middleware for all incoming requests
app.use(logger) // Log each request
// Serve static files (HTML, CSS, JS) from the /public directory
app.use(express.static(path.join(__dirname, 'public')))
// Import API routes from apiRoutes.js
const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
app.use('/api', apiRoutes) // Mount the API routes on /api path
// Serve login.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html')) // Serve the login page at root URL
})
// Serve dashboard.html when user is authenticated
app.get('/api/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html')) // Serve the dashboard HTML file
})
// Serve register.html when user needs to register
app.get('/api/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')) // Serve the register HTML file
})
// Use error handler middleware for catching and handling errors
app.get('/Panache', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'panache.html')) // Serve the register HTML file
})
app.get('/Custody', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'custody.html')) // Serve the register HTML file
})
app.get('/Tasveer', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tasveer.html')) // Serve the register HTML file
})
app.get('/Dhwani', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dhwani.html')) // Serve the register HTML file
})
app.get('/Reflection', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'reflection.html')) // Serve the register HTML file
})
app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'panache.html')) // Serve the register HTML file
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html')) // Serve the register HTML file
})
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'DashboardClub.html')) // Serve the register HTML file
})
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
