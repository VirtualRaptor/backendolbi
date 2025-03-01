const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Brak tokena uwierzytelniającego" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("❌ Błąd weryfikacji tokena Firebase:", err);
    return res.status(403).json({ error: "Nieprawidłowy token" });
  }
};

module.exports = verifyFirebaseToken;
