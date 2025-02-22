const db = require('../config/database');

const Occupation = {
    addOccupation: async (code, name, type) => {
        const query = 'INSERT INTO occupations (code, name, type) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [code, name, type]);
        return result;
    },
    
    getAllOccupations: async () => {
        const query = 'SELECT * FROM occupations';
        const [results] = await db.execute(query);
        return results;
    },

    // Add this function to get occupation by code
    getOccupationByCode: async (code) => {
        const query = 'SELECT * FROM occupations WHERE code = ?';
        const [results] = await db.execute(query, [code]);
        return results; // Return the first result if exists
    },

    searchOccupations: async (keyword) => {
        const query = 'SELECT * FROM occupations WHERE name LIKE ? OR type LIKE ?';
        const [results] = await db.execute(query, [`%${keyword}%`, `%${keyword}%`]);
        return results;
    },

    bulkInsert: async (data) => {
        const query = 'INSERT INTO occupations (name, type) VALUES ?';
        const [result] = await db.query(query, [data]);
        return result;
    },
};

module.exports = Occupation;
