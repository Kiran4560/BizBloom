const express = require("express");
const router = express.Router();
const requireSignIn = require("../middlewares/authMiddleware");
const marketController = require("../controllers/markets.controller");

// Setting APIs 
router.post("/addMarket", requireSignIn, marketController.addMarket); // Protect this route
router.delete("/delete-market/:marketId",requireSignIn,marketController.deleteMarket);
router.put("/update-market/:marketId",requireSignIn,marketController.updateMarket);
router.get("/get-all-market",marketController.getAllMarket);
router.get("/get-user-market",requireSignIn,marketController.getUserMarket);

 module.exports = router;


