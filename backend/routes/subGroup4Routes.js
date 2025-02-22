const express = require('express');
const router = express.Router();
const {
    addSubGroup4,
    searchSubGroup4,
    fetchAllSubGroup4,
    deleteSubGroup4,
    updateSubGroup4,
    exportSubGroup4,
} = require('../controllers/subGroup4Controller');

// Routes
router.post('/add', addSubGroup4);
router.get('/search', searchSubGroup4);
router.get('/all', fetchAllSubGroup4);
router.delete('/:id', deleteSubGroup4);
router.get('/export', exportSubGroup4);

router.put('/update/:id', updateSubGroup4);

module.exports = router;
