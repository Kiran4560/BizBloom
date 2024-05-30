//extracting router method from express module
const express = require("express");
const router = express.Router();

const userController= require("../controllers/users.controller");

//setting apis
router.post("/signup",userController.signup);
router.post("/login",userController.login);
