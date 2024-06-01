//import express
const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 5000;

//connecting to the databse server
// const mongoose = require("mongoose");
// const dbName = "BizBloom";
// mongoose.connect(`mongodb://localhost:27017/${dbName}`);
// const mongoose = require('mongoose');
// const dbName = 'mongodb://localhost:27017/BizBloom';
// mongoose.connect(dbName, { useNewUrlParser: true, useUnifiedTopology: true });

//middleware
app.use(express.json());

//extracting routers
const userRouters = require("./routers/user.routers");

// for parsering json file
const bodyParser = require("body-parser");
app.use(bodyParser.json());



// Use environment variable for MongoDB URL
const dbName = process.env.DB;

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

app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${port}`
    );
  });