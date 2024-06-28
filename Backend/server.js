//import express
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const connect_db = require("./config/db");

// Configure environment variables
dotenv.config();

//database connect
connect_db();

// Initialize express app
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  })
);

//extracting routers
const userRouters = require("./routers/user.routers");
const marketRouters = require("./routers/market.routers");

// for parsering json file
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Adding a middleware for setting headers in api requests for allowing its execution to from another server when using browsers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// Setting API routes
app.use("/api/user", userRouters);
app.use("/api/market", marketRouters);

//default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(port, () => {
  console.log(`Node Server Running on Port ${port}`);
});
