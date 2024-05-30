//import express
const express = require("express");
const colors = require("colors");

const app = express();
const port = 5000;

//connecting to the databse server
// const mongoose = require("mongoose");
// const dbName = "BizBloom";
// mongoose.connect(`mongodb://localhost:27017/${dbName}`);
// const mongoose = require('mongoose');
// const dbName = 'mongodb://localhost:27017/BizBloom';
// mongoose.connect(dbName, { useNewUrlParser: true, useUnifiedTopology: true });


//setting the server port
const mongoose = require('mongoose');

// Use IPv4 address to avoid potential IPv6 issues
const dbName = 'mongodb://127.0.0.1:27017/BizBloom';

mongoose.connect(dbName, {  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.listen(port, () => {
    console.log(
      `Node Server Running In ${dbName} ModeOn Port ${port}`
    );
  });