const express = require('express');
const { getGroupAccess, saveGroupAccess } = require('../controllers/groupAccessController');
const router = express.Router();

// Route to fetch group access for a user
router.get('/:userId', getGroupAccess);

// Route to save group access for a user
router.post('/', saveGroupAccess);

module.exports = router;
