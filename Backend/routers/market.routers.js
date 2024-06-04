//extracting router method from express module
const express = require("express");
const router = express.Router();


const marketController= require("../controllers/markets.controller");


//setting apis 
router.post("/addMarket",marketController.addMarket);
module.exports = router ;