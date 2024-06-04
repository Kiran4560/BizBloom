//extracting router method from express module
const express = require("express");
const router = express.Router();

const userController= require("../controllers/users.controller");

//user apis
router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.post("/togglefav", userController.toggleAddFavMarket);

//password forgot apis
router.post("/forgetpassword",userController.forgetpassword);
router.post("/resetpassword",userController.resetPassword);

module.exports = router ;