const Market = require('../models/market');
// const ratingReview=require('../models/market');
// const User = require("../models/user");


// Add a new rating and review for a market
const addRatingReview = async (req, res) => {
  const { marketId, rating, review } = req.body;
  const userId = req.user._id; // Assuming user ID is stored in req.user._id

  // Validate rating
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    // Find the market by ID
    const market = await Market.findById(marketId);
    console.log(market);
    if (!market) {
      return res.status(404).json({ error: 'Market not found' });
    }
    

    // Check if user has already reviewed
    const existingReviewIndex = market.reviews.findIndex(r => r.user.toString() === userId.toString());
    let newReview;
    if (existingReviewIndex !== -1) {
      // Update existing review
      market.reviews[existingReviewIndex].rating = rating;
      market.reviews[existingReviewIndex].review = review;
      newReview = market.reviews[existingReviewIndex];
    } else {
      // Add new review
      newReview = { user: userId, rating, review };
      market.reviews.push(newReview);
    }
    // Recalculate the average rating
    const totalRating = market.reviews.reduce((acc, review) => acc + review.rating, 0);
    market.rating = totalRating / market.reviews.length;

    // Save updated market document
    await market.save();

    res.status(201).json({ message: 'Rating and review added successfully', review: newReview });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

  exports.RatingAndReview=addRatingReview;