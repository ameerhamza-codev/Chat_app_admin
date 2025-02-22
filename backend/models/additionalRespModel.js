const db = require('../config/database');

// Get all responsibilities
const getAllResponsibilities = async () => {
    const [rows] = await db.query('SELECT * FROM additional_responsibilities');
    return rows;
};

// Add a responsibility
const addResponsibility = async (data) => {
    const { code, name, type } = data;
    const [result] = await db.query(
        'INSERT INTO additional_responsibilities (code, name, type) VALUES (?, ?, ?)',
        [code, name, type]
    );
    return result;
};

// Update a responsibility
const updateResponsibility = async (id, data) => {
    const { name, type } = data;

    // Check if the responsibility exists
    const [existingResponsibility] = await db.query(
        'SELECT * FROM additional_responsibilities WHERE id = ?',
        [id]
    );

    console.log('Existing Responsibility:', existingResponsibility); // Debug: Log the result

    if (existingResponsibility.length === 0) {
        console.log('Responsibility not found with ID:', id);
        return { affectedRows: 0 }; // Simulate no rows updated
    }

    // Proceed with the update
    const [result] = await db.query(
        'UPDATE additional_responsibilities SET name = ?, type = ? WHERE id = ?',
        [name, type, id]
    );

    console.log('SQL Update Result:', result); // Debug: Log the update result
    return result;
};


// Delete a responsibility
const deleteResponsibility = async (id) => {
    const [result] = await db.query(
        'DELETE FROM additional_responsibilities WHERE id = ?',
        [id]
    );
    return result;
};

module.exports = {
    getAllResponsibilities,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility
};
