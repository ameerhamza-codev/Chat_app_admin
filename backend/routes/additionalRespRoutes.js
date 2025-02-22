const express = require('express');
const router = express.Router();
const additionalRespController = require('../controllers/additionalRespController');

// Get all responsibilities
router.get('/', additionalRespController.getAllResponsibilities);

// Add a new responsibility
router.post('/add', additionalRespController.addResponsibility); // Ensure `/add` route exists

// Update a responsibility
router.put('/:id', additionalRespController.updateResponsibility);

// Delete a responsibility
router.delete('/:id', additionalRespController.deleteResponsibility);

module.exports = router;
