const express = require('express');
const router = express.Router();
const { addCountry, getCountries, deleteCountry } = require('../controllers/countryController');

// Route to fetch all countries
router.get('/', getCountries);

// Route to add a new country
router.post('/add', addCountry);

// Route to delete a country by ID
router.delete('/delete/:id', deleteCountry);

module.exports = router;
