const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Middleware sprawdzający token Firebase
const verifyFirebaseToken = require("../middlewares/firebaseAuth");

// Zapis wyniku testu (dla zalogowanych użytkowników)
router.post("/save", verifyFirebaseToken, async (req, res) => {
  try {
    const { answers, totalScore, exhaustionScore, disengagementScore } = req.body;
    const newResult = new Result({
      userId: req.user.uid,
      answers,
      totalScore,
      exhaustionScore,
      disengagementScore
    });
    await newResult.save();

    res.json({ success: true, message: "Wynik zapisany" });
  } catch (err) {
    console.error("❌ Błąd zapisu wyniku:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
