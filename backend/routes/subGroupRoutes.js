const express = require('express');
const router = express.Router();
const subGroupController = require('../controllers/subGroupController'); // Import controller

// Route to fetch subgroups
router.get('/subgroups', subGroupController.getSubGroups);

module.exports = router;
