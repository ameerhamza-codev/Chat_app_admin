const express = require('express');
const {
    addSubGroup2,
    searchSubGroup2,
    importSubGroup2,
    exportSubGroup2,
    getSubGroups2ByMainGroup,
    deleteSubGroup2,
    updateSubGroup2,

    // Correctly include this function
} = require('../controllers/subGroup2Controller');
//const { getFilteredSubGroup2 } = require('../controllers/subGroup2Controller');
const router = express.Router();

router.post('/add', addSubGroup2);
router.get('/search', searchSubGroup2);
router.get('/export', exportSubGroup2);
router.post('/import', importSubGroup2);
router.get('/:groupId', getSubGroups2ByMainGroup);
router.delete('/:id', deleteSubGroup2);
router.put('/:id', updateSubGroup2); // Correct the route definition

module.exports = router;
