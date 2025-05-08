// const express = require('express') // Express for routing and middleware management
// const path = require('path') // Path to handle file paths
// const app = express()
// const session = require('express-session');
// const fs = require('fs');

// app.use(session({
//   secret: 'my_secret_key', // change this
//   resave: false,
//   saveUninitialized: true
// }));


// const morgan=require('morgan')//color codes to the status code
// app.use(morgan('dev'))
// const helmet=require('helmet')
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
//         scriptSrcAttr: ["'unsafe-inline'"],  
//         imgSrc: ["'self'", "data:", "https://github.com/", "https://raw.githubusercontent.com/", "https://sustainable.chitkara.edu.in/", "https://st4.depositphotos.com/", "https://images4.alphacoders.com/","https://images.pexels.com"],
//         styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/", "https://cdnjs.cloudflare.com/"],  // ✅ Allow FontAwesome
//         fontSrc: ["'self'", "https://fonts.gstatic.com/", "https://cdnjs.cloudflare.com/"],
//       },
//     },
//   })
// );



//  // Protects against common vulnerabilities

//  const cors=require('cors')

//  app.use(cors());
 

// const bodyParser=require('body-parser')
// app.use(bodyParser.json());
// // // Middleware to parse URL-encoded data (from HTML forms)
// app.use(bodyParser.urlencoded({ extended: true }));


// const rateLimit = require('express-rate-limit'); // Import the package

// // Define a rate limit: Allow 100 requests per 15 minutes per IP
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//     message: 'Too many requests from this IP, please try again later.',
//     headers: true, // Send rate limit info in headers
// });


// // Apply the rate limiter to all API routes
// app.use('/api', limiter);

// const PORT = 8080
// // Import middlewares
// const logger = require('./middlewares/logger') // Import logger middleware
// const errorHandler = require('./middlewares/errorHandler') // Import error handler middleware
// // Middleware to handle JSON and URL-encoded data in POST requests
// app.use(express.json()) // To parse JSON bodies
// app.use(express.urlencoded({ extended: true })) // To parse URL-encoded data
// // Use logger middleware for all incoming requests
// app.use(logger) // Log each request
// // Serve static files (HTML, CSS, JS) from the /public directory
// app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')))
// app.use('/images', express.static(__dirname + '/public/images'));
// // Import API routes from apiRoutes.js
// const apiRoutes = require('./api/apiRoutes') // Import the API routes for login and register functionality
// app.use('/api', apiRoutes) // Mount the API routes on /api path
// // Serve login.html at the root URL
// app.get('/', (req, res) => {
//   res.render('login'); // Serve the login page at root URL
// })
// // Serve dashboard.html when user is authenticated
// app.get('/api/dashboard', (req, res) => {
//   res.render('dashboard', { user: req.session.user }); // Serve the dashboard HTML file
// })
// // Serve register.html when user needs to register
// app.get('/api/register', (req, res) => {
//   res.render('register'); 
// })
// // Use error handler middleware for catching and handling errors
// app.get('/dashboard', (req, res) => {
//   res.render('dashboard', { user: req.session.user || null })
// })
// app.get('/Panache', (req, res) => {
//   const upcomingPath = path.join(__dirname, 'models', 'upcomingPanacheEvents.json');
//   const pastPath = path.join(__dirname, 'models', 'pastPanacheEvents.json');

//   const upcomingEvents = JSON.parse(fs.readFileSync(upcomingPath, 'utf-8'));
//   const pastEvents = JSON.parse(fs.readFileSync(pastPath, 'utf-8'));

//   res.render('panache', { upcomingEvents, pastEvents });
// })
// app.get('/Custody', (req, res) => {
//   res.render('custody'); // Serve the register HTML file
// })
// app.get('/Tasveer', (req, res) => {
//   res.render('tasveer'); // Serve the register HTML file
// })
// app.get('/Dhwani', (req, res) => {
//   res.render('dhwani');// Serve the register HTML file
// })
// app.get('/Reflection', (req, res) => {
//   res.render('reflection'); // Serve the register HTML file
// })
// app.get('/events', (req, res) => {
//     const upcomingPath = path.join(__dirname, 'models', 'upcomingPanacheEvents.json');
//   const pastPath = path.join(__dirname, 'models', 'pastPanacheEvents.json');

//   const upcomingEvents = JSON.parse(fs.readFileSync(upcomingPath, 'utf-8'));
//   const pastEvents = JSON.parse(fs.readFileSync(pastPath, 'utf-8'));

//   res.render('panache', { upcomingEvents, pastEvents });
// })
// app.get('/contact', (req, res) => {
//   res.render('contact'); // Serve the register HTML file
// })
// app.get('/about', (req, res) => {
//   res.render('aboutus'); // Serve the register HTML file
// })
// app.get('/profile', (req, res) => {
//   res.render('DashboardClub'); // Serve the register HTML file
// })
// app.get('/error', (req, res) => {
//     errorHandler(new Error("An errror occured "),req,res);
// })
// app.use(errorHandler) // Handle errors globally
// // Start the server and listen on the specified port
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`)
// })

const express = require('express'); // Express for routing and middleware management
const path = require('path'); // Path to handle file paths
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const session = require('express-session');
const fs = require('fs');
const logger = require('./middlewares/logger'); // Import logger middleware
const errorHandler = require('./middlewares/errorHandler'); // Import error handler middleware
const apiRoutes = require('./api/apiRoutes'); // Import the API routes for login and register functionality

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/Cu-rrents'; // Replace with your MongoDB URI

// Create an instance of Express
const app = express();

// Middleware setup
app.use(session({
    secret: 'my_secret_key', // change this
    resave: false,
    saveUninitialized: true
  }));
  
  
  const morgan=require('morgan')//color codes to the status code
  app.use(morgan('dev'))
  const helmet=require('helmet')
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          scriptSrcAttr: ["'unsafe-inline'"],  
          imgSrc: ["'self'", "data:", "https://github.com/", "https://raw.githubusercontent.com/", "https://sustainable.chitkara.edu.in/", "https://st4.depositphotos.com/", "https://images4.alphacoders.com/","https://images.pexels.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com/", "https://cdnjs.cloudflare.com/"],  // ✅ Allow FontAwesome
          fontSrc: ["'self'", "https://fonts.gstatic.com/", "https://cdnjs.cloudflare.com/"],
        },
      },
    })
  );
  
  
  
   // Protects against common vulnerabilities
  
   const cors=require('cors')
  
   app.use(cors());
   
  
  const bodyParser=require('body-parser')
  app.use(bodyParser.json());
  // // Middleware to parse URL-encoded data (from HTML forms)
  app.use(bodyParser.urlencoded({ extended: true }));
  
  
  const rateLimit = require('express-rate-limit'); // Import the package
  
  // Define a rate limit: Allow 100 requests per 15 minutes per IP
  const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      headers: true, // Send rate limit info in headers
  });
  
  
  // Apply the rate limiter to all API routes
  app.use('/api', limiter);

// Set up MongoDB connection using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes for login, register, and other pages
app.use('/api', apiRoutes); // Mount the API routes on the /api path

app.get('/', (req, res) => {
  res.render('login'); // Serve the login page at root URL
});

app.get('/api/dashboard', (req, res) => {
  res.render('dashboard', { user: req.session.user }); // Serve the dashboard HTML file
});

app.get('/api/register', (req, res) => {
  res.render('register'); // Serve the registration page
});

// Example of fetching events from MongoDB
app.get('/Panache', (req, res) => {
  const upcomingPath = path.join(__dirname, 'models', 'upcomingPanacheEvents.json');
  const pastPath = path.join(__dirname, 'models', 'pastPanacheEvents.json');

  const upcomingEvents = JSON.parse(fs.readFileSync(upcomingPath, 'utf-8'));
  const pastEvents = JSON.parse(fs.readFileSync(pastPath, 'utf-8'));

  res.render('panache', { upcomingEvents, pastEvents });
})

// Other routes
app.get('/Custody', (req, res) => res.render('custody'));
app.get('/Tasveer', (req, res) => res.render('tasveer'));
app.get('/Dhwani', (req, res) => res.render('dhwani'));
app.get('/Reflection', (req, res) => res.render('reflection'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/about', (req, res) => res.render('aboutus'));
app.get('/profile', (req, res) => res.render('DashboardClub'));
app.get('/error', (req, res) => {
  errorHandler(new Error('An error occurred'), req, res);
});
app.use(errorHandler); // Global error handler middleware

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
