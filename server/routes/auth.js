const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(401)
        .json({ success: false, msg: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });
    await newUser.save();
    return res.status(200).json({ success: true, msg: "Account created" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Error adding user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp1234@&", {
      expiresIn: "5h",
    });
    return res
      .status(200)
      .json({
        success: true,
        token,
        user: { name: user.name },
        msg: "Logged in successfully",
      });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

module.exports = router;
