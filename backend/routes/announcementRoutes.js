const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

// Get all announcements
router.get('/announcements', announcementController.getAnnouncements);

// Add a new announcement
router.post('/announcements', announcementController.addAnnouncement);

module.exports = router;
