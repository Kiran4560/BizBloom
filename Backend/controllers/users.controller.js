
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const User = require("../models/user");

//===========================================SIGNUP-FUNCTION=================================================================
// Signup function
const signup = async (req, res) => {
  // Destructuring and storing requested data
  const { username, email, password } = req.body;

 
//validation
  try {

  if(!username || !email || !password)
  return res.status(404).json({error:"Please enter all the required fields"});

  // Finding existing user with same email
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
   // req.session.userId = newUser._id; // Store user ID in session
    console.log("User added");
    console.log(newUser);
    return res.status(201).json({ user: newUser});
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

//===========================================LOGIN-FUNCTION======================================================================

// login request

const loginUser = async (req, res) => {
  try{
  const { email, password } = req.body;

  //valodation
  if(!email || !password){
    return res.status(404).send({
      success:false,
      message:"Invalid email or password"
    })
  }
  
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the hashed password in the database
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //create token
    const token =  jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY, {
      expiresIn:'3d'
    });

    console.log("User login successful",user);
    res.status(200).send({
      success:true, 
      message: "Login successfully",
    user:{
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
    },
   token
});
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
        success:false,
        message:"Error in login",
        err,
       });
  }
};

//=======================================TOGGL_FAV_MARKET-FUNCTION================================================================

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

//==============================================FORGET-PASSWORD==================================================================

//forget-password function

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token (JWT)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send email with the reset token
    const resetUrl = `http://localhost:5000/reset-password?token=${resetToken}`;
    const emailBody = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Please use the following link to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await mailSender(user.email, "Password Reset Request", emailBody);
    console.log("token-->",resetToken);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};



//========================================RESET_PASSWORD-FUNCTION===================================================================================

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid token or user not found" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user's password
    user.password = hashedPassword;
    await user.save();
    console.log(hashedPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};





exports.toggleAddFavMarket = toggleAddFavMarket;
exports.signup = signup;
exports.login = loginUser;
exports.forgetpassword = forgotPassword;
exports.resetpassword = resetPassword;