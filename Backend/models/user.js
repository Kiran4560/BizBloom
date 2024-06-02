//import mongoose
const mongoose = require("mongoose");

//Schema for users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true],
    unique: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true],
    unique: true,
  },
  password: {
    type: String,
    required: [true],
    minlength: 8,
  },
  favourites: [
    {
      type: String,
    },
  ],
  markets: [
    {
      type: String,
    },
  ],
});

//exporting User modal
module.exports = mongoose.model("User", userSchema);