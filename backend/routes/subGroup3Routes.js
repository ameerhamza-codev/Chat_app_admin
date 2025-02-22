const express = require('express');
const {
    addSubGroup3,
    getSubGroup3,
    importSubGroup3,
    exportSubGroup3,
    searchSubGroup3,
    searchSubGroup2,
    getFilteredSubGroup3Data,
    deleteSubGroup3,
    updateSubGroup3
} = require('../controllers/subGroup3Controller');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/add', addSubGroup3);
router.get('/', getSubGroup3);
router.post('/import', upload.single('file'), importSubGroup3);
router.get('/export', exportSubGroup3);
router.post('/search', searchSubGroup3);
router.get('/search-subgroup2', searchSubGroup2);
router.get('/', getFilteredSubGroup3Data);
router.delete('/delete/:id', deleteSubGroup3);

router.put('/update/:id', updateSubGroup3);
module.exports = router;
