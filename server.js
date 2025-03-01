require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("./firebaseConfig"); // Import Firebase Admin SDK

// Import tras
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const resultRoutes = require("./routes/results");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Połączenie z MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Połączono z MongoDB"))
  .catch(err => console.log("Błąd połączenia z MongoDB:", err));

// Rejestracja ścieżek
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/results", resultRoutes);

// Strona startowa
app.get("/", (req, res) => {
  res.send("Witaj w backendzie OLBI Test!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
