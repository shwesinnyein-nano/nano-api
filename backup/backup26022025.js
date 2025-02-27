

// const express = require("express");
// const speakeasy = require("speakeasy");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const admin = require("firebase-admin");
// const { OAuth2Client } = require("google-auth-library");

// const app = express();

// app.use(cors())
//  app.use(express.json());
//  const qrcode = require("qrcode");


// const serviceAccount = require("./config/nano-hr-satging-firebase-adminsdk-qrykr-2122a57324.json"); 
// const e = require("express");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
    
// });


// const db = admin.firestore();
// db.collection("test").add({ message: "Firestore is connected!" })
//   .then(docRef => console.log("Document written with ID:", docRef.id))
//   .catch(error => console.error("Error adding document:", error));

// const userOtps = {}; 


// const CLIENT_ID = "nano-hr-satging"; 
// const client = new OAuth2Client(CLIENT_ID);


// app.use(cors({
//     origin: "*", // Allow all domains
//     methods: "GET, POST, PUT, DELETE, OPTIONS", // Allow all methods
//     allowedHeaders: "*", // Allow all headers
// }));
// // const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
// // const CHANNEL_ACCESS_TOKEN = 'DQ+6KCdWi+hgRn4h5CPRYB+6Eb41FANRufSvIg6ljaH/pdcgsKm65CcXg226Vlacbqv+qo/pkPlWmo1i1qoOkPoGuO+9PnF580V08OfFTWwf/pf1OmKd5e3hLRkaltY1ZxHzefci4/B3zTo+tdhFvwdB04t89/1O/w1cDnyilFU=';

// app.post("/send-line-message", async (req, res) => {
//     try {
//         const { userId, message } = req.body;

//         const response = await axios.post(
//             LINE_API_URL,
//             {
//                 to: userId,
//                 messages: [{ type: "text", text: message }],
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
//                 },
//             }
//         );

//         res.status(200).json({ success: true, data: response.data });
//     } catch (error) {
//         console.error("Error sending LINE message:", error.response?.data || error.message);
//         res.status(500).json({ success: false, error: error.response?.data || error.message });
//     }
// });
// // app.post("/send-otp", async (req, res) => {
// //     const { mobileNumber } = req.body;
// //     try {
// //         const employeesRef = db.collection("employees");
// //         const snapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();
    
// //         if (snapshot.empty) {
// //             return res.status(400).json({ error: "No user found with this mobile number" });
// //         }
    
      
// //         const otp = speakeasy.totp({
// //             secret: "MY_SECRET_KEY",
// //             encoding: "base32",
// //         });

// //         userOtps[mobileNumber] = otp; 

// //         console.log(`Generated OTP for ${mobileNumber}: ${otp}`); 

        

// //         res.json({ message: "OTP sent successfully" });

// //     } catch (error) {
// //         console.error("Error fetching employee:", error);
// //         res.status(500).json({ error: "Internal server error" });
// //     }
// // });

// // app.post("/check-employee", async (req, res) => {
// //     try {
// //         const { mobileNumber } = req.body;

// //         if (!mobileNumber) {
// //             return res.status(400).json({ message: "Mobile number is required" });
// //         }

// //         // Query Firestore where primary_number == mobileNumber
// //         const employeesRef = db.collection("employees");
// //         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

// //         if (querySnapshot.empty) {
// //             return res.status(404).json({ message: "Employee not found" });
// //         }

// //         // Assuming primary number is unique, get the first matching employee
// //         const employeeData = querySnapshot.docs[0].data();
// //             console.log("empd data", employeeData)
// //         if (!employeeData.secret && mobileNumber !== employeeData.primary_number) {
// //             return res.status(400).json({ message: "Employee has not enabled 2FA" });
// //         }

// //         res.json({ success: true, message: "Employee exists and has 2FA enabled" });

// //     } catch (error) {
// //         console.error("Error checking employee:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });
// app.post("/check-employee", async (req, res) => {
//     try {
//         const { mobileNumber } = req.body;

//         if (!mobileNumber) {
//             return res.status(400).json({ message: "Mobile number is required" });
//         }

//         // Query Firestore for employees where primary_number == mobileNumber
//         const employeesRef = db.collection("employees");
//         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         // Get the first matching employee (assuming primary_number is unique)
//         const employeeData = querySnapshot.docs[0].data();
//         console.log("Employee Data:", employeeData);

//         // Ensure the primary number matches and 2FA (secret) exists
//         if (!employeeData.secret) {
//             return res.status(400).json({ message: "Employee has not enabled 2FA" });
//         }

//         // Return success response with employee info
//         res.json({
//             success: true,
//             message: "Employee exists and has 2FA enabled",
//             employee: {
//                 auth_id: employeeData.auth_id, // Include auth_id for login reference
//                 name: employeeData.name, // Optional: Send employee name if needed
//             }
//         });

//     } catch (error) {
//         console.error("Error checking employee:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// app.post("/send-otp", async (req, res) => {
//     const { mobileNumber } = req.body;
  
//     try {
//       const employeesRef = db.collection("employees");
//       const snapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();
  
//       if (snapshot.empty) {
//         return res.status(400).json({ error: "No user found with this mobile number" });
//       }
  
//       const employeeDoc = snapshot.docs[0];
//       const employeeData = employeeDoc.data();
  
//       if (!employeeData.secretKey) {
//         return res.status(400).json({ error: "Google Authenticator is not set up for this user" });
//       }
  
//       // Generate OTP based on stored secret key
//       const otp = speakeasy.totp({
//         secret: employeeData.secretKey,
//         encoding: "base32",
//       });
  
//       console.log(`Generated OTP for ${mobileNumber}: ${otp}`); 
  
//       res.json({ message: "OTP sent successfully", otp });
  
//     } catch (error) {
//       console.error("Error fetching employee:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

//   async function generateFirebaseToken(uid) {
//     return await admin.auth().createCustomToken(uid);
//   }
//   app.post("/verify-otp", async (req, res) => {
//     try {
//         const { mobileNumber, otp } = req.body;

//         if (!mobileNumber || !otp) {
//             return res.status(400).json({ message: "Mobile number and OTP are required" });
//         }

//         // Query Firestore where primary_number == mobileNumber
//         const employeesRef = db.collection("employees");
//         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         const employeeDoc = querySnapshot.docs[0];
//         const employeeData = employeeDoc.data();
//         console.log("✅ Employee Data:", employeeData);

//         if (!employeeData.secret) {
//             return res.status(400).json({ message: "Employee has not enabled 2FA" });
//         }

//         // Verify OTP using speakeasy
//         const verified = speakeasy.totp.verify({
//             secret: employeeData.secret,
//             encoding: "base32",
//             token: otp,
//             window: 1 // Allows a slight time drift
//         });

//         if (!verified) {
//             return res.status(400).json({ message: "Invalid OTP" });
//         }

//         // Generate Firebase Custom Token
//         const firebaseUid = employeeDoc.id; // Use Firestore document ID as UID
//         const firebaseToken = await admin.auth().createCustomToken(firebaseUid);

//         console.log("✅ Firebase Token Generated:", firebaseToken);

//         res.json({ 
//             success: true, 
//             message: "OTP verified successfully", 
//             firebaseCustomToken: firebaseToken, 
//             employeeData 
//         });

//     } catch (error) {
//         console.error("❌ Error verifying OTP:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
//   app.post("/verify-otp-real", async (req, res) => {
//     try {
//         const { mobileNumber, otp } = req.body;

//         if (!mobileNumber || !otp) {
//             return res.status(400).json({ message: "Mobile number and OTP are required" });
//         }

//         // Query Firestore where primary_number == mobileNumber
//         const employeesRef = db.collection("employees");
//         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         const employeeData = querySnapshot.docs[0].data();
//         console.log("emploheee", employeeData)

//         if (!employeeData.secret && employeeData.primary_number !== mobileNumber) {
//             return res.status(400).json({ message: "Employee has not enabled 2FA" });
//         }

//         // Verify OTP using speakeasy
//         const verified = speakeasy.totp.verify({
//             secret: employeeData.secret,
//             encoding: "base32",
//             token: otp,
//             window: 1 // Allows a slight time drift
//         });

//         if (verified) {
//             res.json({ success: true, message: "OTP verified successfully", data: employeeData });
//         } else {
//             res.status(400).json({ message: "Invalid OTP" });
//         }

//     } catch (error) {
//         console.error("Error verifying OTP:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });


// // app.post("/verify-otp", async (req, res) => {
// //     try {
// //         const { employeeId, token } = req.body;

// //         if (!employeeId || !token) {
// //             return res.status(400).json({ message: "Employee ID and OTP token are required" });
// //         }

// //         // Retrieve employee's secret key from Firestore
// //         const employeeDoc = await db.collection("employees").doc(employeeId).get();

// //         if (!employeeDoc.exists) {
// //             return res.status(404).json({ message: "Employee not found" });
// //         }

// //         const secret = employeeDoc.data().secret;

// //         // Verify OTP
// //         const verified = speakeasy.totp.verify({
// //             secret: secret,
// //             encoding: "base32",
// //             token: token,
// //             window: 1, // Allow time drift
// //         });

// //         if (verified) {
// //             return res.json({ success: true, message: "OTP verified successfully" });
// //         } else {
// //             return res.status(400).json({ success: false, message: "Invalid OTP" });
// //         }
// //     } catch (error) {
// //         console.error("Error verifying OTP:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });


// // app.post("/verify-otp", async (req, res) => {
// //     const { mobileNumber, otp } = req.body;

// //     if (userOtps[mobileNumber] && userOtps[mobileNumber] === otp) {
// //         delete userOtps[mobileNumber]; 
// //         res.json({ success: true, message: "OTP verified successfully" });
// //     } else {
// //         res.status(400).json({ error: "Invalid OTP" });
// //     }
// // });

// app.post("/google-auth", async (req, res) => {
//     const { token } = req.body;

//     try {
       
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         const userId = payload["sub"]; 
//         const email = payload["email"];
//         const name = payload["name"];

//         console.log("Google Auth Success:", { userId, email, name });

//         const userRef = db.collection("employees").where("email", "==", email);
//         const snapshot = await userRef.get();

//         if (snapshot.empty) {
//             return res.status(400).json({ error: "User not registered in system" });
//         }

//         res.json({ success: true, message: "Google authentication successful", user: payload });

//     } catch (error) {
//         console.error("Google Auth Error:", error);
//         res.status(500).json({ error: "Invalid Google token" });
//     }
// });


// // work data
// app.post("/generate-secret", async (req, res) => {
//     console.log("📌 Received Request:", req.body);
//     const mobileNumber = req.body.mobileNumber

//     try {
//         const { uid, isnew } = req.body; // Get employee ID & isnew flag

//         if (!uid) {
//             console.log("❌ Employee UID is missing");
//             return res.status(400).json({ message: "Employee UID is required" });
//         }

//         const employeeRef = db.collection("employees").doc(uid);
//         const employeeDoc = await employeeRef.get();

//         if (!employeeDoc.exists) {
//             console.log("❌ Employee not found:", uid);
//             return res.status(400).json({ message: "Employee not found." });
//         }

//         const employeeData = employeeDoc.data();

//         // ✅ If secret key exists, return it (DO NOT generate new)
//         if (employeeData.secret) {
//             console.log("✅ Secret key already exists for", uid);
//             return res.json({ secret: employeeData.secret, qrCode: employeeData.qrCode, message: "Secret key already exists." });
//         }

//         // ❌ If secret key is missing, generate a new one
//         console.log("🔑 Generating new secret key for:", uid);
//         //const secret = speakeasy.generateSecret({ length: 20 });

//         const secret = speakeasy.generateSecret({
//             length: 20,
//             name: `${employeeData.companyName} (${mobileNumber})`, // ✅ Custom name in Authenticator
//             issuer: "MyCompany" // ✅ Issuer name
//         });

//         // Generate the OTP Auth URL with custom name
//        // const otpAuthUrl = `otpauth://totp/${encodeURIComponent("MyCompany:" + employeeName)}?secret=${secret.base32}&issuer=${encodeURIComponent("MyCompany")}`;
//         // Generate QR Code
//         const otpAuthUrl = secret.otpauth_url;
//         const qrCodeImage = await qrcode.toDataURL(otpAuthUrl);

//         // Save to Firestore
//         await employeeRef.update({ secret: secret.base32, qrCode: qrCodeImage });

//         console.log("✅ New Secret Key Generated:", secret.base32);

//         res.json({ secret: secret.base32, qrCode: qrCodeImage, message: "New secret key generated." });
//     } catch (error) {
//         console.error("❌ Error generating secret:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });




// //not real
// // app.post("/generate-secret", async (req, res) => {
// //     console.log("Received Request:", req.body);

// //     try {
// //         const { uid, authId } = req.body; // ✅ Accepts uid & authId

// //         if (!uid || !authId) {
// //             console.log("❌ Missing required parameters.");
// //             return res.status(400).json({ message: "Employee UID and Auth ID are required." });
// //         }

// //         const employeeRef = db.collection("employees").doc(uid);
// //         const employeeDoc = await employeeRef.get();

// //         if (!employeeDoc.exists) {
// //             console.log("❌ Employee not found:", uid);
// //             return res.status(400).json({ message: "Employee not found." });
// //         }

// //         const employeeData = employeeDoc.data();

// //         // ✅ Check if authId matches the stored authId
// //         if (employeeData.authId !== authId) {
// //             console.log("❌ Invalid authId for employee:", uid);
// //             return res.status(403).json({ message: "Unauthorized access." });
// //         }

// //         // ✅ If employee already has a secret key, return it
// //         if (employeeData.secret) {
// //             console.log("✅ Secret key already exists:", employeeData.secret);
// //             return res.json({ secret: employeeData.secret, message: "Secret key already exists." });
// //         }

// //         // ✅ If employee doesn't have a secret key, generate and save a new one
// //         const secret = speakeasy.generateSecret({ length: 20 });

// //         await employeeRef.update({ secret: secret.base32 });

// //         console.log("✅ New Secret Key Generated:", secret.base32);

// //         res.json({ secret: secret.base32, message: "New secret key generated." });

// //     } catch (error) {
// //         console.error("❌ Error generating secret:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });

// // app.post("/generate-secret", async (req, res) => {
// //     console.log("Received Request:", req.body);

// //     try {
// //         const { uid, isnew } = req.body; // ✅ Accepts uid & isnew flag

// //         if (!uid) {
// //             console.log("❌ Employee UID is missing in request");
// //             return res.status(400).json({ message: "Employee UID is required" });
// //         }

// //         const employeeRef = db.collection("employees").doc(uid);
// //         const employeeDoc = await employeeRef.get();

// //         if (!employeeDoc.exists) {
// //             console.log("❌ Employee does not exist:", uid);
// //             return res.status(400).json({ message: "Employee not found." });
// //         }

// //         const employeeData = employeeDoc.data();

// //         // ✅ If employee already has a secret key, return it
// //         if (employeeData.secret) {
// //             console.log("✅ Secret key already exists:", employeeData.secret);
// //             return res.json({ secret: employeeData.secret, message: "Secret key already exists." });
// //         }

// //         // ✅ If employee doesn't have a secret key, generate and save a new one
// //         const secret = speakeasy.generateSecret({ length: 20 });

// //         await employeeRef.update({ secret: secret.base32 });

// //         console.log("✅ New Secret Key Generated:", secret.base32);

// //         res.json({ secret: secret.base32, message: "New secret key generated." });

// //     } catch (error) {
// //         console.error("❌ Error generating secret:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });

// // app.post("/generate-secret", async (req, res) => {
// //     console.log("req", req.body);
// //     try {
// //         const { mobileNumber, isnew } = req.body;

// //         if (!mobileNumber) {
// //             return res.status(400).json({ message: "Mobile number is required" });
// //         }

// //         const employeeDoc = await db.collection("employees").doc(mobileNumber).get();

// //         if (employeeDoc.exists && !isnew) {
// //             return res.status(400).json({ message: "Secret key already exists for this employee." });
// //         }

// //         // Generate a unique secret key
// //         const secret = speakeasy.generateSecret({ length: 20 });

// //         // Save the secret key to Firestore
// //         await db.collection("employees").doc(mobileNumber).set(
// //             { mobileNumber, secret: secret.base32 },
// //             { merge: true } // Ensures existing data is not overwritten
// //         );

// //         // Generate a QR code for Google Authenticator
// //         const otpAuthUrl = secret.otpauth_url;
// //         const qrCodeImage = await qrcode.toDataURL(otpAuthUrl); // ✅ Fix error

// //         res.json({ secret: secret.base32, qrCode: qrCodeImage });
// //     } catch (error) {
// //         console.error("Error generating secret:", error);
// //         res.status(500).json({ message: "Internal server error" });
// //     }
// // });
// app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));



// const express = require("express");
// const speakeasy = require("speakeasy");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const admin = require("firebase-admin");
// const { OAuth2Client } = require("google-auth-library");

// const app = express();

// app.use(cors())
//  app.use(express.json());
//  const qrcode = require("qrcode");


// const serviceAccount = require("./firebase-admin.json"); 
// const e = require("express");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
    
// });


// const db = admin.firestore();
// db.collection("test").add({ message: "Firestore is connected!" })
//   .then(docRef => console.log("Document written with ID:", docRef.id))
//   .catch(error => console.error("Error adding document:", error));

// const userOtps = {}; 


// const CLIENT_ID = "nano-hr-satging"; 
// const client = new OAuth2Client(CLIENT_ID);


// app.post("/check-employee", async (req, res) => {
//     try {
//         const { mobileNumber } = req.body;

//         if (!mobileNumber) {
//             return res.status(400).json({ message: "Mobile number is required" });
//         }

//         // Query Firestore for employees where primary_number == mobileNumber
//         const employeesRef = db.collection("employees");
//         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         // Get the first matching employee (assuming primary_number is unique)
//         const employeeData = querySnapshot.docs[0].data();
//         console.log("Employee Data:", employeeData);

//         // Ensure the primary number matches and 2FA (secret) exists
//         if (!employeeData.secret) {
//             return res.status(400).json({ message: "Employee has not enabled 2FA" });
//         }

//         // Return success response with employee info
//         res.json({
//             success: true,
//             message: "Employee exists and has 2FA enabled",
//             employee: {
//                 auth_id: employeeData.auth_id, // Include auth_id for login reference
//                 name: employeeData.name, // Optional: Send employee name if needed
//             }
//         });

//     } catch (error) {
//         console.error("Error checking employee:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });



// app.post("/send-otp", async (req, res) => {
//     const { mobileNumber } = req.body;
  
//     try {
//       const employeesRef = db.collection("employees");
//       const snapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();
  
//       if (snapshot.empty) {
//         return res.status(400).json({ error: "No user found with this mobile number" });
//       }
  
//       const employeeDoc = snapshot.docs[0];
//       const employeeData = employeeDoc.data();
  
//       if (!employeeData.secretKey) {
//         return res.status(400).json({ error: "Google Authenticator is not set up for this user" });
//       }
  
//       // Generate OTP based on stored secret key
//       const otp = speakeasy.totp({
//         secret: employeeData.secretKey,
//         encoding: "base32",
//       });
  
//       console.log(`Generated OTP for ${mobileNumber}: ${otp}`); 
  
//       res.json({ message: "OTP sent successfully", otp });
  
//     } catch (error) {
//       console.error("Error fetching employee:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

//   app.post("/verify-otp", async (req, res) => {
//     try {
//         const { mobileNumber, otp } = req.body;

//         if (!mobileNumber || !otp) {
//             return res.status(400).json({ message: "Mobile number and OTP are required" });
//         }

//         // Query Firestore where primary_number == mobileNumber
//         const employeesRef = db.collection("employees");
//         const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

//         if (querySnapshot.empty) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         const employeeData = querySnapshot.docs[0].data();
//         console.log("emploheee", employeeData)

//         if (!employeeData.secret && employeeData.primary_number !== mobileNumber) {
//             return res.status(400).json({ message: "Employee has not enabled 2FA" });
//         }

//         // Verify OTP using speakeasy
//         const verified = speakeasy.totp.verify({
//             secret: employeeData.secret,
//             encoding: "base32",
//             token: otp,
//             window: 1 // Allows a slight time drift
//         });

//         if (verified) {
//             res.json({ success: true, message: "OTP verified successfully", data: employeeData });
//         } else {
//             res.status(400).json({ message: "Invalid OTP" });
//         }

//     } catch (error) {
//         console.error("Error verifying OTP:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });




// app.post("/google-auth", async (req, res) => {
//     const { token } = req.body;

//     try {
       
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         const userId = payload["sub"]; 
//         const email = payload["email"];
//         const name = payload["name"];

//         console.log("Google Auth Success:", { userId, email, name });

//         const userRef = db.collection("employees").where("email", "==", email);
//         const snapshot = await userRef.get();

//         if (snapshot.empty) {
//             return res.status(400).json({ error: "User not registered in system" });
//         }

//         res.json({ success: true, message: "Google authentication successful", user: payload });

//     } catch (error) {
//         console.error("Google Auth Error:", error);
//         res.status(500).json({ error: "Invalid Google token" });
//     }
// });


// // work data
// app.post("/generate-secret", async (req, res) => {
//     console.log("📌 Received Request:", req.body);
//     const mobileNumber = req.body.mobileNumber

//     try {
//         const { uid, isnew } = req.body; // Get employee ID & isnew flag

//         if (!uid) {
//             console.log("❌ Employee UID is missing");
//             return res.status(400).json({ message: "Employee UID is required" });
//         }

//         const employeeRef = db.collection("employees").doc(uid);
//         const employeeDoc = await employeeRef.get();

//         if (!employeeDoc.exists) {
//             console.log("❌ Employee not found:", uid);
//             return res.status(400).json({ message: "Employee not found." });
//         }

//         const employeeData = employeeDoc.data();

//         // ✅ If secret key exists, return it (DO NOT generate new)
//         if (employeeData.secret) {
//             console.log("✅ Secret key already exists for", uid);
//             return res.json({ secret: employeeData.secret, qrCode: employeeData.qrCode, message: "Secret key already exists." });
//         }

//         // ❌ If secret key is missing, generate a new one
//         console.log("🔑 Generating new secret key for:", uid);
//         //const secret = speakeasy.generateSecret({ length: 20 });

//         const secret = speakeasy.generateSecret({
//             length: 20,
//             name: `${employeeData.companyName} (${mobileNumber})`, // ✅ Custom name in Authenticator
//             issuer: "MyCompany" // ✅ Issuer name
//         });

//         // Generate the OTP Auth URL with custom name
//        // const otpAuthUrl = `otpauth://totp/${encodeURIComponent("MyCompany:" + employeeName)}?secret=${secret.base32}&issuer=${encodeURIComponent("MyCompany")}`;
//         // Generate QR Code
//         const otpAuthUrl = secret.otpauth_url;
//         const qrCodeImage = await qrcode.toDataURL(otpAuthUrl);

//         // Save to Firestore
//         await employeeRef.update({ secret: secret.base32, qrCode: qrCodeImage });

//         console.log("✅ New Secret Key Generated:", secret.base32);

//         res.json({ secret: secret.base32, qrCode: qrCodeImage, message: "New secret key generated." });
//     } catch (error) {
//         console.error("❌ Error generating secret:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });





// app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));



const express = require("express");
const speakeasy = require("speakeasy");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const qrcode = require("qrcode");

const app = express();

app.use(cors());
app.use(express.json());

const serviceAccount = require("./config/firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.collection("test").add({ message: "Firestore is connected!" })
  .then(docRef => console.log("✅ Firestore connected. Test ID:", docRef.id))
  .catch(error => console.error("❌ Firestore connection error:", error));

/** 📌 1️⃣ Check if Employee Exists */
app.post("/check-employee", async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        if (!mobileNumber) return res.status(400).json({ message: "Mobile number is required" });

        const employeesRef = db.collection("employees");
        const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const employeeData = querySnapshot.docs[0].data();

        if (!employeeData.secret) {
            return res.status(400).json({ message: "Employee has not enabled 2FA" });
        }

        res.json({
            success: true,
            message: "Employee exists and has 2FA enabled",
            employee: {
                auth_id: employeeData.auth_id,
                name: employeeData.name,
            }
        });

    } catch (error) {
        console.error("❌ Error checking employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/** 📌 2️⃣ Send OTP */
app.post("/send-otp", async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        if (!mobileNumber) return res.status(400).json({ message: "Mobile number is required" });

        const employeesRef = db.collection("employees");
        const snapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "No user found with this mobile number" });
        }

        const employeeDoc = snapshot.docs[0];
        const employeeData = employeeDoc.data();

        if (!employeeData.secret) {
            return res.status(400).json({ message: "Google Authenticator is not set up for this user" });
        }

        // ✅ Generate OTP from stored secret
        const otp = speakeasy.totp({
            secret: employeeData.secret,
            encoding: "base32",
        });

       // console.log(`📨 OTP for ${mobileNumber}: ${otp}`);

        res.json({ message: "OTP sent successfully", otp });

    } catch (error) {
        console.error("❌ Error sending OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/** 📌 3️⃣ Verify OTP */
app.post("/verify-otp", async (req, res) => {
    try {
        const { mobileNumber, otp } = req.body;

        if (!mobileNumber || !otp) {
            return res.status(400).json({ message: "Mobile number and OTP are required" });
        }

        const employeesRef = db.collection("employees");
        const querySnapshot = await employeesRef.where("primary_number", "==", mobileNumber).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const employeeData = querySnapshot.docs[0].data();

        if (!employeeData.secret) {
            return res.status(400).json({ message: "Employee has not enabled 2FA" });
        }
        console.log("employee secret", employeeData)

        // ✅ Verify OTP
        const verified = speakeasy.totp.verify({
            secret: employeeData.secret,
            encoding: "base32",
            token: otp,
            window: 2, // Allow slight time drift
        });

        console.log(`🔍 Verifying OTP for ${mobileNumber}:`, { otp, verified });

        if (verified) {
            const firebaseCustomToken = await admin.auth().createCustomToken(employeeData.authId);
            
            res.json({
                success: true,
                message: "OTP verified successfully",
                firebaseCustomToken,  // ✅ Return the custom token
                employeeData
            });
            // res.json({ success: true, message: "OTP verified successfully", data: employeeData });
        } else {
            res.status(400).json({ message: "Invalid OTP" });
        }

    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/** 📌 4️⃣ Generate TOTP Secret */
app.post("/generate-secret", async (req, res) => {
    console.log("req generate key", req)
    try {
        const { uid, mobileNumber } = req.body;
        if (!uid || !mobileNumber) return res.status(400).json({ message: "UID and mobile number required" });

        const employeeRef = db.collection("employees").doc(uid);
        const employeeDoc = await employeeRef.get();

        console.log("emp doc", employeeDoc)
        if (!employeeDoc.exists) return res.status(404).json({ message: "Employee not found" });

        const employeeData = employeeDoc.data();
        console.log("employee dat", employeeData)
        // ✅ Return existing secret if already set up
        if (employeeData.secret) {
            return res.json({ secret: employeeData.secret, qrCode: employeeData.qrCode, message: "Secret key already exists." });
        }

        // ✅ Generate new TOTP secret
        const secret = speakeasy.generateSecret({
            length: 20,
            name: `${employeeData.companyName} (${mobileNumber})`,
            issuer: "MyCompany"
        });

        const otpAuthUrl = secret.otpauth_url;
        const qrCodeImage = await qrcode.toDataURL(otpAuthUrl);

        // ✅ Save to Firestore
        await employeeRef.update({ secret: secret.base32, qrCode: qrCodeImage });

        console.log("🔑 New Secret Key Generated:", secret.base32);

        res.json({ secret: secret.base32, qrCode: qrCodeImage, message: "New secret key generated." });
    } catch (error) {
        console.error("❌ Error generating secret:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/** 📌 Start Server */
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
