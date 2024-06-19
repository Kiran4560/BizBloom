//import mongoose
const mongoose = require("mongoose");

//Schema for markets
const marketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  phonenum: {
    type: Number,
    required: true,
  },
  imageURL: { type: String },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  description: { 
    type: String 
  },
  rating: {
    type: Number,
  },
  openingTime: {
    type: String,
    required: true,
  },
  closingTime: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User"
   },
   ratingReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RatingReview' }],
 
});

//exporting Market modal
module.exports = mongoose.model("Market", marketSchema);