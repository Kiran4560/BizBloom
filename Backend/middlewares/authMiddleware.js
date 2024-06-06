const jwt = require("jsonwebtoken");

// Protected Routes token base

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Get token from headers
    if (!token) {
      return res.status(401).json({ message: "No token provided or token format is invalid" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


module.exports = requireSignIn;
