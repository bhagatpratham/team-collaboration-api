const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  // try {
  if (token) {
    const decoded = jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "Invalid token", token });
      } else {
        console.log("Decoded Token:", decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "token not found" });
  }
  // req.user = decoded;
  // next();
  // } catch (error) {
  //   return res.status(400).json({ message: "Invalid token", error });
  // }
};
