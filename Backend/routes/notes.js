const express = require("express");
const router = express.Router();

// importing the notes_Schema
const notes_Schema = require("../models/notes_schema.js");

// importing the middleware
const fetchUser = require("../middleware/fetchUser");

// importing express validators
const { body, validationResult } = require("express-validator");

// router Working
// 1./api/notes/getallnote
router.get("/getallnote", fetchUser, async (req, res) => {
  const allnote = await notes_Schema.find({ user: req.user.id });
  // console.log(allnote.json());
  res.json(allnote);
});

// 2./api/notes/addnote
router.post(
  "/addnote",
  fetchUser,
  [
    // Validate description
    body("description").notEmpty().withMessage("Write Some Description"),

    // Validate title
    body("title")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description, title } = req.body;
      const new_note = new notes_Schema({
        title: title,
        description: description,
        user: req.user.id,
      });
      await new_note.save();
      // res.send(new_note);
      res.json({ msg: "Note Created Successfully", role: "success" });
    } catch (error) {
      res.json({ msg: error.message, role: "warning" });

      // res.status(400).json({ error: error.message });
    }
  }
);

// 3./api/notes/update:id
router.put(
  "/update/:id",
  fetchUser,
  [
    // Validate description
    body("description").notEmpty().withMessage("Write Some Description"),

    // Validate title
    body("title")
      .isLength({ min: 4 })
      .withMessage("title must be longer then 4 charcter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let note = await notes_Schema.findById(req.params.id);
      if (note.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({
            msg: "You are not allowed to update this note",
            role: "warning",
          });
      }
      if (!note) {
        return res.status(404).json({ msg: "Note Not Found", role: "warning" });
      }
      let UpadtedNote = {};
      let { title, description } = req.body;
      if (title) {
        UpadtedNote.title = title;
      }
      if (description) {
        UpadtedNote.description = description;
      }
      UpadtedNote = await notes_Schema.findByIdAndUpdate(
        req.params.id,
        UpadtedNote,
        {
          new: true,
        }
      );
      res.json({ msg: "Notes is Updated", role: "success" });
    } catch (error) {
      res.json({ msg: error.message, role: "warning" });
    }
  }
);

// 4./api/notes/delete:id
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    let note = await notes_Schema.findById(req.params.id);
    if (note.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({
          msg: "You are not allowed to update this note",
          role: "warning",
        });
    }
    if (!note) {
      return res.status(404).json({ msg: "Note Not Found", role: "warning" });
    }
    await notes_Schema.findByIdAndDelete(req.params.id);
    res.json({ msg: "Note Is Deleted", role: "success" });
  } catch (error) {
    res.json({ msg: error.message, role: "warning" });
  }
});

//  exporting the router to the index.js
module.exports = router;
