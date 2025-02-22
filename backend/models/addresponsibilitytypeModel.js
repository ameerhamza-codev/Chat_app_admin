const db = require('../config/database'); // Import your database connection

const ResponsibilityType = {
    create: async (name) => {
        try {
            const query = 'INSERT INTO addresponsibility_types (name) VALUES (?)';
            const [result] = await db.execute(query, [name]);
            return result;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('Responsibility type already exists.');
            }
            throw error; // For other errors
        }
    },
    getAll: async () => {
        const query = 'SELECT * FROM addresponsibility_types';
        const [rows] = await db.execute(query);
        return rows;
    },
    delete: async (id) => {
        const query = 'DELETE FROM addresponsibility_types WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    },
};

module.exports = ResponsibilityType;
