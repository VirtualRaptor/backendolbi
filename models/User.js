// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verifyToken: { type: String }
});

module.exports = mongoose.model("User", userSchema);
