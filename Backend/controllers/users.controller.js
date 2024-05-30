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



// login request

const loginUser = async(req,res,next)=>{
  const {email,password}=req.body;

  let existingUser ;
  
  try{
    existingUser = User.findOne({email:email});
  }catch(err){
    console.log(err.message);
    res.status(500).json({error : "Login in failed,please try again later"});
    return;
  }

  //user not found
  if(!existingUser){
    console.log("User with this email doesn't exist");
    res.status(401).json({error: "No user exists with this email,please signup"});
    return;
  }

  //User found then hash password
  async function checkPassword(){
const isMatching = await new Promise((resolve,reject)=>{
  bcrypt.compare(password,existingUser.password,(error,isMatch)=>{
    if(error)
    reject(error);
  resolve(isMatch);

  });
});
return isMatching;
  }

  const isPasswordMatching = await checkPassword();
  console.log(isPasswordMatching);

  //Wrong password
  if(!isPasswordMatching){
    console.log("Wrong Password");
    res.status(401).json({error : "Wrong Password, Please enter the correct Password"});
   
  }
  else{
    console.log("User found");
    console.log(existingUser);
    res.status(201).json({
      message : "Logged in!",
      user: existingUser,
    });
  }

};



exports.login = loginUser;