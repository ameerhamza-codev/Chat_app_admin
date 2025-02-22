const express = require('express');
const router = express.Router();
const { getReports, getReportDetails } = require('../controllers/reportController');

// Fetch reports based on filters
router.get('/search', getReports);

// Fetch details of a specific report
router.get('/details/:id', getReportDetails);

module.exports = router;
