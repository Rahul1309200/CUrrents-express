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
// Protects against common vulnerabilities
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

  
  
   const cors=require('cors') // Cross-Origin Resource Sharing allows sharing when frontend is on different port
  
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
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//   });
mongoose.connect(mongoURI);


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
app.get('/Panache', async (req, res) => {
  try {
    const allEvents = await Event.find(); // Fetch all events from MongoDB

    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date();
    });

    const pastEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < new Date();
    });

    res.render('panache', { upcomingEvents, pastEvents });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/Panache', async (req, res) => {
  try {
    const allEvents = await Event.find(); // Fetch all events from MongoDB

    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date();
    });

    const pastEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < new Date();
    });

    res.render('panache', { upcomingEvents, pastEvents });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/events', async (req, res) => {
  try {
    const allEvents = await Event.find(); // Fetch all events from MongoDB

    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date();
    });

    const pastEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate < new Date();
    });

    res.render('panache', { upcomingEvents, pastEvents });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes
app.get('/Custody', (req, res) => res.render('custody'));
app.get('/dashboard', (req, res) => res.render('dashboard', { user: req.session.user }));
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

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  time: String,
  location: String,
  description: String,
  imageUrl: String,
  registrationUrl: String
});

const Event = mongoose.model('Event', eventSchema);

// POST route to save event
app.post('/api/events', async (req, res) => {
  try {
      const event = new Event(req.body);
      await event.save();
      res.status(200).json({ message: 'Event saved successfully!' });
  } catch (err) {
      res.status(500).json({ error: 'Failed to save event' });
  }
});


app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);//fetchibg all the events and sending them in json response
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
