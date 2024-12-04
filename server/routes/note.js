const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const middleware = require("../middleware/middleware");

router.post("/add",middleware, async (req, res) => {
  try {
    const { title,description } = req.body;

    const newNote = new Note({
      title,
      description,
      user: req.user._id,
    });
    await newNote.save();
    return res.status(200).json({ success: true, msg: "Account created" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: "Error adding user" });
  }
});

module.exports = router