const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const marketController = require("../controllers/markets.controller");
const ratingReviewController = require("../controllers/ratingReview.controller");

// Setting APIs 
router.post("/addMarket", requireSignIn, marketController.addMarket); // Protect this route
router.delete("/delete-market/:marketId",requireSignIn,marketController.deleteMarket);
router.put("/update-market/:marketId",requireSignIn,marketController.updateMarket);
router.get("/get-all-market",marketController.getAllMarket);
router.get("/get-user-market",requireSignIn,marketController.getUserMarket);

// POST request to save a rating/review
router.post("/rating-review", requireSignIn,ratingReviewController.RatingAndReview);

 module.exports = router;


