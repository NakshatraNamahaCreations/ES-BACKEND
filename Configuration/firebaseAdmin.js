const admin = require("firebase-admin");
const serviceAccount = require("./adminkey.json"); // Path to your Firebase Admin SDK JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
