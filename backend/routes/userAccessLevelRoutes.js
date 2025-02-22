const express = require("express");
const {
  getAllAccessLevels,
  addAccessLevel,
  deleteAccessLevel,
} = require("../controllers/userAccessLevelController");

const router = express.Router();

// Fetch all access levels
router.get("/", getAllAccessLevels);

// Add a new access level
router.post("/", addAccessLevel);

// Delete an access level
router.delete("/:id", deleteAccessLevel);

module.exports = router;
