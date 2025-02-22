const db = require('../config/database'); // Ensure this points to your database configuration

// Fetch group access for a specific user
const getGroupAccess = async (req, res) => {
  const { userId } = req.params;
  try {
    const [results] = await db.query(
      `SELECT user_access_level_id 
       FROM group_access 
       WHERE user_id = ?`,
      [userId]
    );
    const accessLevelIds = results.map((row) => row.user_access_level_id);
    res.status(200).json(accessLevelIds);
  } catch (error) {
    console.error("Error fetching group access:", error);
    res.status(500).json({ error: "Failed to fetch group access" });
  }
};


// Save group access for a specific user
const saveGroupAccess = async (req, res) => {
  const { userId, accessLevelIds } = req.body; // Change variable name to match the frontend
  console.log("Received data:", req.body); // Debugging: Check what is being received

  // Validate inputs
  if (!userId || !Array.isArray(accessLevelIds)) {
      return res.status(400).json({ error: "Invalid request. userId and accessLevelIds are required." });
  }

  try {
      // Check if user exists in the alluser table
      const [userExists] = await db.query('SELECT id FROM alluser WHERE id = ?', [userId]);
      if (!userExists.length) {
          return res.status(400).json({ error: `User with ID ${userId} does not exist in alluser table` });
      }

      // Delete existing group access for the user
      await db.query('DELETE FROM group_access WHERE user_id = ?', [userId]);

      // Insert new group access levels if accessLevelIds is not empty
      if (accessLevelIds.length > 0) {
          const values = accessLevelIds.map((levelId) => [userId, levelId]);
          await db.query('INSERT INTO group_access (user_id, user_access_level_id) VALUES ?', [values]);
      }

      res.status(200).json({ message: "Group access updated successfully" });
  } catch (error) {
      console.error("Error saving group access:", error);
      res.status(500).json({ error: "Failed to save group access" });
  }
};

  

module.exports = { getGroupAccess, saveGroupAccess };
