const express = require('express');
const router = express.Router();
const occupationController = require('../controllers/occupationController');

router.post('/add', occupationController.addOccupation);
router.get('/', occupationController.getOccupations);
router.get('/search', occupationController.searchOccupations);
router.get('/export', occupationController.exportOccupations);
router.post('/import', occupationController.importOccupations);
router.delete('/:id', occupationController.deleteOccupation);
router.put('/:id', occupationController.updateOccupation);

module.exports = router;
