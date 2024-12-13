

// Backend Router
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
      userId: req.user.id,
    });
    await newNote.save();
    return res.status(200).json({ success: true, msg: "Note created" });
  } catch (err) {
    console.error("Add Note Error:", err.message);
    return res.status(500).json({ success: false, msg: "Error creating note" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Get Notes Error:", error.message);
    return res.status(500).json({ success: false, msg: "Unable to retrieve notes" });
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    console.error("Update Note Error:", error.message);
    return res.status(500).json({ success: false, msg: "Unable to update note" });
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, deleteNote });
  } catch (error) {
    console.error("Delete Note Error:", error.message);
    return res.status(500).json({ success: false, msg: "Unable to delete note" });
  }
});

module.exports = router;

