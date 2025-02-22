const express = require('express');
const { addMainGroup, getAllMainGroups, deleteMainGroup, editMainGroup } = require('../controllers/mainGroupController');
const router = express.Router();

// Add a Main Group
router.post('/add', addMainGroup);

// Get all Main Groups
router.get('/all', getAllMainGroups);

// Delete a Main Group
router.delete('/delete/:id', deleteMainGroup);

// Edit a Main Group
router.put('/edit/:id', editMainGroup);

module.exports = router;
