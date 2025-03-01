// backend/models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  category: String // np. "Wyczerpanie" albo "Dystansowanie"
});

module.exports = mongoose.model("Question", questionSchema);
