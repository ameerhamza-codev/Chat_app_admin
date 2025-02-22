const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Add user
router.post("/add", userController.addUser);
router.put('/:id', userController.updateUser);
// Delete user
router.delete("/delete/:id", userController.deleteUser);

// Get dropdown data
router.get("/dropdown/:tableName", userController.getDropdownData);
router.get('/user', userController.getAllUsers);
// Search users
router.get("/search", userController.searchUsers);
router.get("/export", userController.exportUsers);
module.exports = router;
