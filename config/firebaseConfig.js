

// const admin = require("firebase-admin");
// const path = require("path");


// const serviceAccount = require(path.join(__dirname, "./firebase-admin.json"));


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
 
// });

// const db = admin.firestore();

// module.exports = { admin, db };

const admin = require("firebase-admin");

// Ensure the environment variable is loaded
const serviceAccountJSON = process.env.FIREBASE_SERVICE_ACCOUNT;
console.log("serviceAccountJSON", serviceAccountJSON)

if (!serviceAccountJSON) {
  throw new Error("Missing FIREBASE_SERVICE_ACCOUNT environment variable");
}

const serviceAccount = JSON.parse(serviceAccountJSON);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
