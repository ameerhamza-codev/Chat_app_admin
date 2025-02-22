const express = require('express');
const {
    addResponsibilityType,
    getResponsibilityTypes,
    deleteResponsibilityType,
} = require('../controllers/addRespTypeController');

const router = express.Router();

router.post('/add', addResponsibilityType);
router.get('/', getResponsibilityTypes);
router.delete('/:id', deleteResponsibilityType); // Add delete route

module.exports = router;
