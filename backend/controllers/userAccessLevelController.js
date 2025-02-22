const db = require("../config/database");

// Fetch all access levels
const getAllAccessLevels = async (req, res) => {
  try {
    const [levels] = await db.query("SELECT * FROM user_access_level");
    res.status(200).json(levels);
  } catch (error) {
    console.error("Error fetching access levels:", error);
    res.status(500).json({ error: "Failed to fetch access levels" });
  }
};

// Add a new access level
const addAccessLevel = async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Access level name is required" });
    }
  
    try {
      const [result] = await db.query(
        "INSERT INTO user_access_level (access_level) VALUES (?)",
        [name] // Ensure this is NOT NULL
      );
      res.status(201).json({ id: result.insertId, name });
    } catch (error) {
      console.error("Error adding access level:", error);
      res.status(500).json({ error: "Failed to add access level" });
    }
  };
  

// Delete an access level
const deleteAccessLevel = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM user_access_level WHERE id = ?", [id]);
    res.status(200).json({ message: "Access level deleted successfully" });
  } catch (error) {
    console.error("Error deleting access level:", error);
    res.status(500).json({ error: "Failed to delete access level" });
  }
};

module.exports = { getAllAccessLevels, addAccessLevel, deleteAccessLevel };
