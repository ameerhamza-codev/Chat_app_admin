const db = require('../config/database');

// Fetch all countries
exports.getAllCountries = async () => {
    const query = 'SELECT * FROM countries';
    try {
        const [results] = await db.query(query); // Use destructuring to extract results
        return results;
    } catch (err) {
        throw err; // Pass the error to the caller
    }
};

// Add a new country
exports.addCountry = async (name) => {
    const query = 'INSERT INTO countries (name) VALUES (?)';
    try {
        const [results] = await db.query(query, [name]);
        return results;
    } catch (err) {
        throw err;
    }
};

// Delete a country by ID
exports.deleteCountry = async (id) => {
    const query = 'DELETE FROM countries WHERE id = ?';
    try {
        const [results] = await db.query(query, [id]);
        return results;
    } catch (err) {
        throw err;
    }
};
