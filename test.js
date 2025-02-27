const { db } = require("./config/firebaseConfig");

async function testFirestore() {
  try {
    const snapshot = await db.collection("employees").get();
    if (snapshot.empty) {
      console.log("⚠️ No employees found in Firestore.");
    } else {
      snapshot.forEach(doc => console.log(doc.id, "=>", doc.data()));
    }
  } catch (error) {
    console.error("❌ Firestore Authentication Error:", error.message);
  }
}

testFirestore();
