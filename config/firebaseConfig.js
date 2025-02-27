

const admin = require("firebase-admin");
const path = require("path");

const privateKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)


console.log("private key", privateKey)
if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
  console.error("❌ Missing Firebase environment variables!");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: privateKey,
  }),
});

const serviceAccount = require(path.join(__dirname, "./firebase-admin.json"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 
});

const db = admin.firestore();

module.exports = { admin, db };
