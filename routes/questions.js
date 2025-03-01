// backend/routes/questions.js
const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Pobranie wszystkich pytań
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dodanie pytań do bazy (jednorazowo)
router.post("/add", async (req, res) => {
  try {
    const questions = req.body; // tablica obiektów [{text, category}, ...]
    await Question.insertMany(questions);
    res.json({ message: "Pytania dodane do bazy" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
