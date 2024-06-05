const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const marketController = require("../controllers/markets.controller");

// Setting APIs 
router.post("/addMarket", requireSignIn, marketController.addMarket); // Protect this route

module.exports = router;
