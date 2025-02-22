const Country = require('../models/countryModel');

// Fetch all countries
exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.getAllCountries(); // Use async/await
        res.status(200).json(countries);
    } catch (err) {
        console.error('Error fetching countries:', err);
        res.status(500).json({ error: 'Failed to fetch countries', details: err });
    }
};

// Add a new country
exports.addCountry = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Country name is required.' });
    }

    try {
        const result = await Country.addCountry(name); // Attempt to add the country
        res.status(201).json({ message: 'Country added successfully.', data: result });
    } catch (err) {
        console.error('Error adding country:', err);

        // Handle duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'Country already exists. Please use a different name.',
            });
        }

        // Handle other server errors
        return res.status(500).json({ error: 'Failed to add country.', details: err });
    }
};
// Delete a country by ID
exports.deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Country ID is required' });
        }

        // Call the delete function from the model
        const result = await Country.deleteCountry(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Country not found' });
        }

        res.status(200).json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ message: 'Error deleting country', error });
    }
};
