const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const session = require('express-session');
const saltRounds = 10;
const authenticate = require("../middlewares/authenticate.middleware.js");
router.use(session({
  secret: 'secret', // Change this to a secure random string
  resave: false,
  saveUninitialized: false
}));
router.post("/login", async (req, res) => {
  console.log("here:",req)
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Update the lastLogin field to the current date and time
    user.lastLogin = new Date();
    await user.save();
    const token = authenticate.generateToken(user._id);
    // Return user data or JWT token to the client
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    console.log("here:", req.body)
    const { username, email, password, name, phone } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      phone,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post('/logout', (req, res) => {
  //invalidate JWT token still pending
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Logout successful' });
  });
});
module.exports = router;
