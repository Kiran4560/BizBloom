//import mongoose
const mongoose = require("mongoose");

const ratingreviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true ,min: 1, max: 5},
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

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
  reviews: [ratingreviewSchema],
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
});

//exporting Market modal
module.exports = mongoose.model("Market", marketSchema);
