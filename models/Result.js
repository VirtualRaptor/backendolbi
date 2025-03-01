// backend/models/Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Jeśli chcesz przypisać wynik do użytkownika
  name: String,                // imię
  age: Number,                 // wiek
  occupation: String,          // zawód (job)
  workHours: Number,           // liczba godzin pracy tygodniowo
  answers: Array,              // tablica odpowiedzi z quizu
  exhaustionScore: Number,     // obliczony wynik "Zmęczenie"
  disengagementScore: Number,  // obliczony wynik "Dystans / Cynnizm"
  totalScore: Number,          // sumaryczny wynik, jeśli chcesz
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Result", resultSchema);
