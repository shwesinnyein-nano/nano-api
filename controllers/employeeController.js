const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const { admin, db } = require("../config/firebaseConfig")

exports.checkEmployee = async (req, res) => {
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
}

exports.getEmployee = async (req, res) => {
    console.log("📡 Fetching employees from Firestore...", );
    try {
       

        // Ensure Firestore is connected
        const testDoc = await db.collection("test").doc("testConnection").set({ status: "connected" });
        console.log("✅ Firestore is connected.");

        // Fetch employees
        const employeesRef = db.collection("employees");
        const snapshot = await employeesRef.get();

        if (snapshot.empty) {
            console.warn("⚠️ No employees found in Firestore.");
            return res.status(404).json({ message: "No employees found" });
        }

        let employees = [];
        snapshot.forEach((doc) => {
            employees.push({ id: doc.id, ...doc.data() });
        });

        console.log("✅ Employees fetched successfully:", employees.length);
        res.status(200).json(employees);
    } catch (error) {
        console.error("❌ Error fetching employees:", error.message);

        if (error.code === 16) {
            console.error("❌ Firestore Authentication Error: Check Firebase Admin credentials.");
            return res.status(403).json({ message: "Unauthorized Access: Check Firestore Rules." });
        }

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// exports.getEmployee = async (req, res) => {
//     try {
//         console.log("📡 Fetching employees from Firestore...");

//         const employeesRef = db.collection("employees");
//         const snapshot = await employeesRef.get();

//         if (snapshot.empty) {
//             console.warn("⚠️ No employees found in Firestore.");
//             return res.status(404).json({ message: "No employees found" });
//         }

//         let employees = [];
//         snapshot.forEach((doc) => {
//             employees.push({ id: doc.id, ...doc.data() });
//         });

//         console.log("✅ Employees fetched successfully:", employees);
//         res.status(200).json(employees);
//     } catch (error) {
//         console.error("❌ Error fetching employees:", error.message);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };