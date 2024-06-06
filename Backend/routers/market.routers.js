const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const marketController = require("../controllers/markets.controller");

// Setting APIs 
router.post("/addMarket", requireSignIn, marketController.addMarket); // Protect this route
router.delete("/delete-market/:marketId",requireSignIn,marketController.deleteMarket);
router.put("/update-market/:marketId",requireSignIn,marketController.updateMarket);

 module.exports = router;
// {
//     "title": "My Shop",
//     "phonenum": "9923339888",
//     "imageURL": "http://example.com/image.jpg",
//     "address": "123 Market Street",
//     "lat": 12.34,
//     "lng": 56.78,
//     "description": "A description of the market",
//     "openingTime": "09:00",
//     "closingTime": "18:00",
//     "profession": "Grocery"
//   }
