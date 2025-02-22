const express = require('express');
const {
    addSubGroup1,
    searchSubGroup1,
    importSubGroup1,
    exportSubGroup1,
    getSubGroups1ByMainGroup,
    deleteSubGroup1, 
    updateSubGroup1// Correctly include this function
} = require('../controllers/subGroup1Controller'); // Ensure the path is correct

const router = express.Router();

// Route definitions
router.post('/add', addSubGroup1); // Add Sub Group 1
router.get('/search', searchSubGroup1); // Search Sub Group 1
router.post('/import', importSubGroup1); // Import Sub Group 1
router.get('/export', exportSubGroup1); // Export Sub Group 1
router.get('/:groupId', getSubGroups1ByMainGroup); // Fetch sub-groups by group ID
router.delete('/:id', deleteSubGroup1);
router.put('/:id', updateSubGroup1);
module.exports = router;
