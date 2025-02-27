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
    try {
      const employeesRef = db.collection("employees");
      const snapshot = await employeesRef.get();
  
      if (snapshot.empty) {
        return res.status(404).json({ message: "No employees found" });
      }
  
      let employees = [];
      snapshot.forEach((doc) => {
        employees.push({ id: doc.id, ...doc.data() });
      });
  
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };