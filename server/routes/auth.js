const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = router;
