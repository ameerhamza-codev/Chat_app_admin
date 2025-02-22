const pool = require('../config/database');

// Fetch all Main Groups
const getMainGroups = async () => {
    try {
        const [results] = await pool.query('SELECT * FROM main_groups');
        return results;
    } catch (err) {
        console.error('Error querying database:', err);
        throw err;
    }
};

// Create a new Main Group
const createMainGroup = async (name, code) => {
    try {
        const [results] = await pool.query('INSERT INTO main_groups (name, code) VALUES (?, ?)', [name, code]);
        return results;
    } catch (err) {
        console.error('Error inserting into database:', err);
        throw err;
    }
};

// Delete a Main Group by ID
const deleteMainGroupById = async (id) => {
    try {
        const [results] = await pool.query('DELETE FROM main_groups WHERE id = ?', [id]);
        return results;
    } catch (err) {
        console.error('Error deleting from database:', err);
        throw err;
    }
};

// Update a Main Group by ID
const updateMainGroupById = async (id, name, code) => {
    try {
        const [results] = await pool.query(
            'UPDATE main_groups SET name = ?, code = ? WHERE id = ?',
            [name, code, id]
        );
        return results;
    } catch (err) {
        console.error('Error updating database:', err);
        throw err;
    }
};

module.exports = { getMainGroups, createMainGroup, deleteMainGroupById, updateMainGroupById };
