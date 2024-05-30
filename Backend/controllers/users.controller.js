const bcrypt = require("bcryptjs");
const User = require("../models/user");

//signup function
const addUser = async (req, res, next) => {
  //destructuring and storing requested data
  const { name, email, password } = req.body;

  //finding existing user with same email;
  let existingUserEmail;
  try {
    existingUserEmail = await User.findOne({ email: email });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
  

  //checking existing userEmail
  if (existingUserEmail) {
    console.log("A user with this email already exists");
    console.log(existingUserEmail);
    res.status(422).json({ error: "A user with this email already exists" });
  }

  //finding existing user with same username;
  let existingUserName;
  try {
    existingUserName = await User.findOne({ username: name });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }

  //checking existing username
  if (existingUserName) {
    console.log("A user with this username already exists");
    console.log(existingUserName);
    res.status(422).json({ error: "A user with this username already exists" });
  } 

  
  async function hashPassword() {
    const saltRounds = 10; // Defines the number of salt rounds

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  const hashedPassword = await hashPassword();

  //creating newUser object
  const newUser = new User({
    username: name,
    email,
    password: hashedPassword,
    favourites: [],
    markets: [],
  });

  //add newUser to database
  try {
    await newUser.save();
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }

  console.log("User added");
  console.log(newUser);
  //resending data with 'OK' status code
  res.status(201).json({ user: newUser });
 
};



