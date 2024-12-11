const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const middleware = require("../middleware/middleware");

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

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

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "can't retrieve notes" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "can't Update notes" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deleteNote });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "can't delete notes" });
  }
});
module.exports = router;
