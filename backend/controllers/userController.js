const fs = require("fs");
const path = require("path");
const userModel = require("../models/userModel");
const { Parser } = require("json2csv");
const db = require('../config/database');
exports.addUser = async (req, res) => {
    try {
        const { confirmPassword, ...userData } = req.body; // Exclude confirmPassword
        console.log('Request body (cleaned):', userData); // Log cleaned request body
        await userModel.addUser(userData);
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error in addUser controller:', error.message);
        res.status(500).json({ error: error.message });
    }
};



exports.getDropdownData = async (req, res) => {
  const { tableName } = req.params;
  try {
    const [rows] = await userModel.fetchDropdownData(tableName);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  const keyword = req.query.keyword || ""; // Ensure keyword is defined

  console.log("Search keyword:", keyword); // Log the incoming keyword

  try {
    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required for search" });
    }

    const [rows] = await userModel.searchUsers({ keyword });
    console.log("Search results:", rows); // Log the results from the database
    res.json(rows);
  } catch (error) {
    console.error("Error in searchUsers:", error.message);
    res.status(500).json({ error: error.message });
  }
};

  
exports.exportUsers = async (req, res) => {
    try {
      const [users] = await userModel.exportUsers();
  
      if (!users.length) {
        return res.status(404).json({ message: "No user data found for export" });
      }
  
      const fields = [
        "mainGroupCode", "subGroup1Code", "subGroup2Code", "subGroup3Code", "subGroup4Code",
        "name", "fatherName", "workingCountry", "workingCity", "occupation", "email", "mobile", "gender"
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(users);
  
      const filePath = path.join(__dirname, "../exports/users.csv");
      fs.writeFileSync(filePath, csv);
  
      res.setHeader("Content-Disposition", "attachment; filename=users.csv");
      res.setHeader("Content-Type", "text/csv");
      res.status(200).sendFile(filePath, () => {
        fs.unlinkSync(filePath); // Delete file after sending it to the client
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.deleteUser = async (req, res) => {
    const { id } = req.params; // Get user ID from request parameters
    try {
        const [result] = await userModel.deleteUser(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser controller:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params; // Extract user ID from the request parameters
  const userData = req.body; // Extract user data from the request body

  try {
      console.log('Updating user with ID:', id);
      console.log('New data:', userData);

      // Call the model to update the user
      const [result] = await userModel.updateUser(id, userData);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
      console.error('Error in updateUser controller:', error.message);
      res.status(500).json({ error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching users from database...');
    const [users] = await db.query(`
      SELECT id, mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code, 
             name, fatherName, displayName, DOB, landline, companyName, workingCountry, 
             workingCity, occupation, email, mobile, gender, password,
             refer_to_friend, group_code, action, 
             sub_group1_representative, sub_group2_representative, 
             sub_group3_representative, sub_group4_representative
      FROM alluser
    `);
    console.log('Users fetched:', users); // Debugging
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAllUsers:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getSingleUserDetail = async (req, res) => {
  const { id } = req.params; // Extract user ID from request parameters

  try {
      console.log("Fetching details for user ID:", id);

      const [user] = await db.query(
          `SELECT  email, password, mainGroupCode, subGroup1Code, subGroup2Code, 
                  subGroup3Code, subGroup4Code, name, fatherName, displayName, DOB, 
                  landline, companyName, workingCountry, workingCity, occupation, 
                  mobile, gender 
           FROM alluser WHERE id = ?`, 
          [id]
      );

      if (user.length === 0) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user[0]); // Return the user details
  } catch (error) {
      console.error("Error in getSingleUserDetail:", error.message);
      res.status(500).json({ error: error.message });
  }
};


