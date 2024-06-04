//import express
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//extracting routers
const userRouters = require("./routers/user.routers");
const marketRouters = require("./routers/market.routers");
dotenv.config();

const app = express();
const port = 5000;

//middleware
app.use(express.json());


// for parsering json file
const bodyParser = require("body-parser");
app.use(bodyParser.json());



// Use environment variable for MongoDB URL
const dbName = process.env.DB;

// Create a store for sessions
const store = new MongoDBStore({
  uri: dbName,
  collection: 'sessions'
});

// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: store
}));

//database connection
const connect_db=mongoose.connect(dbName,{})
  .then(() => {
    console.log("Connected to MongoDB ");
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  //adding a middleware for setting headers in api requests for allowing its execution to from another server when using browsers
  app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});


//setting api
app.use("/api/user", userRouters);
app.use("/api/market",marketRouters);

app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${port}`
    );
  });