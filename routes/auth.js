const express = require("express");
const admin = require("../firebaseConfig");

const router = express.Router();

// Middleware do weryfikacji tokena Firebase
const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1]; // Pobiera token po "Bearer "

  if (!idToken) {
    return res.status(401).json({ error: "Brak tokena autoryzacyjnego" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Nieprawidłowy token" });
  }
};

// Pobranie danych użytkownika po zalogowaniu
router.get("/user", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Błąd pobierania danych użytkownika" });
  }
});

// Usuwanie konta użytkownika
router.delete("/delete", verifyFirebaseToken, async (req, res) => {
  try {
    await admin.auth().deleteUser(req.user.uid);
    res.json({ message: "Konto usunięte" });
  } catch (error) {
    res.status(500).json({ error: "Błąd usuwania konta" });
  }
});

module.exports = router;
