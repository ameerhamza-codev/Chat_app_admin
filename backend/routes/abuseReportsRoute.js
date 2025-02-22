const express = require('express');
const router = express.Router();
const {
    getAbuseReports,
    addAbuseReport,
    deleteAbuseReport,
} = require('../controllers/abuseReportController');

router.get('/reports', getAbuseReports);
router.post('/reports', addAbuseReport);
router.delete('/reports/:id', deleteAbuseReport);

module.exports = router;
