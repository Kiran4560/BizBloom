//extracting router method from express module
const express = require("express");
const router = express.Router();

const userController= require("../controllers/users.controller");

//user apis
router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.post("/togglefav", userController.toggleAddFavMarket);

//password forgot apis
router.post("/forget-password",userController.forgetpassword);
router.post("/reset-password",userController.resetpassword);

module.exports = router ;