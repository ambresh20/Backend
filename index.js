const express = require("express");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require("express-session");
const passport = require("passport");

// Initialize Express App
const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration to allow all origins
app.use(cors({
  origin: '*',  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to database
connectDB();

// Passport and Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", authRoutes);

// Different View
// app.set('view engine', 'ejs') ;

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Backend page</h1>"); 
});

app.get("/home", (req, res) => {
  res.status(200).json({ message: "Welcome, your app is working well" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const postRouters = require("./routes/postRouters") ;
const categoryRoutes = require('./routes/categoryRouter');  
const tagRoutes = require('./routes/tagRouter');  

app.use('/api/posts', postRouters);
app.use('/api/categories', categoryRoutes); 
app.use('/api/tags', tagRoutes);  


// Export the Express 
module.exports = app;

