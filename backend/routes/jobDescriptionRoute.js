const express = require('express');
const router = express.Router();
const jobDescriptionController = require('../controllers/jobDescriptionController');

router.post('/job-descriptions', jobDescriptionController.addJobDescription);
router.get('/job-descriptions', jobDescriptionController.getAllJobDescriptions);
router.put('/job-descriptions/:id', jobDescriptionController.updateJobDescription);
router.delete('/job-descriptions/:id', jobDescriptionController.deleteJobDescription);

module.exports = router;
