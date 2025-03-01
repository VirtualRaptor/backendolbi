const admin = require("firebase-admin");
const serviceAccount = require("./wypalenie-zawodowe-firebase-adminsdk-fbsvc-394004a52f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
