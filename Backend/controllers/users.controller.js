
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Signup function
const addUser = async (req, res) => {
  // Destructuring and storing requested data
  const { username, email, password } = req.body;

  // Finding existing user with same email
  try {
    const existingUserEmail = await User.findOne({ email: email });
    if (existingUserEmail) {
      console.log("A user with this email already exists");
      return res.status(422).json({ error: "A user with this email already exists" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }

  // Finding existing user with same username
  try {
    const existingUserName = await User.findOne({ username: username });
    if (existingUserName) {
      console.log("A user with this username already exists");
      return res.status(422).json({ error: "A user with this username already exists" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }

  // Hashing the password
  let hashedPassword;
  try {
    const saltRounds = 10; // Defines the number of salt rounds
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to hash the password" });
  }

  // Creating newUser object
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
    favourites: [],
    markets: [],
  });

  // Adding newUser to database
  try {
    await newUser.save();
    console.log("User added");
    console.log(newUser);
    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};



// login request

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If login is successful, respond with the user data
    console.log("user found",user);
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

//add and remove fav market
const toggleAddFavMarket = async (req, res) => {
  const { userId, marketId } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      console.error(`Error: No user with this id exists: ${userId}`);
      return res.status(401).json({ error: "No user with this id exists" });
    }

    // Check if the market is already in the user's favorites
    const existingMarket = user.favourites.find((mid) => {
      console.log(mid, marketId, mid === marketId);
      return mid === marketId;
    });
    console.log("Existing market id : ", existingMarket);

    if (existingMarket) {
      // Market is already in favorites, so remove it
      try {
        await User.updateOne(
          { _id: userId },
          { $pull: { favourites: marketId } }
        );
        res.status(201).json({ message: "Removed from fav" });
      } catch (updateError) {
        console.error(`Error removing market from favorites: ${updateError.message}`);
        res.status(500).json({ error: updateError.message });
      }
    } else {
      // Market is not in favorites, so add it
      try {
        await User.updateOne(
          { _id: userId },
          { $push: { favourites: marketId } }
        );
        res.status(201).json({ message: "Added to fav" });
      } catch (updateError) {
        console.error(`Error adding market to favorites: ${updateError.message}`);
        res.status(500).json({ error: updateError.message });
      }
    }
  } catch (err) {
    console.error(`Error finding user: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};


exports.toggleAddFavMarket = toggleAddFavMarket;
exports.signup = addUser;
exports.login = loginUser;