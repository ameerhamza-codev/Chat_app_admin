const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Add Location
router.post('/add', locationController.addLocation);

// Get All Locations
router.get('/', locationController.getAllLocations);

// Update Location
router.put('/:id', locationController.updateLocation);

// Delete Location
router.delete('/:id', locationController.deleteLocation);

// Export Locations
router.get('/export', locationController.exportLocations);

// Import Locations
router.post('/import', locationController.importLocations);

module.exports = router;
