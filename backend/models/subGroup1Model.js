const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

// Create Sub Group 1
const createSubGroup1 = async (mainGroupCode, name, code) => {
    try {
        const query = 'INSERT INTO sub_group1 (main_group_code, name, code) VALUES (?, ?, ?)';
        const [result] = await pool.execute(query, [mainGroupCode, name, code]);
        return result;
    } catch (error) {
        console.error('Error adding Sub Group 1:', error);
        throw error;
    }
};

// Search Sub Group 1
const searchSubGroup1InDB = async (query, filter) => {
    try {
        const sql = `SELECT * FROM sub_group1 WHERE ${filter} LIKE ?`;
        const [rows] = await pool.execute(sql, [`%${query}%`]);
        return rows;
    } catch (error) {
        console.error('Error searching Sub Group 1 in DB:', error);
        throw error;
    }
};

// Import Sub Group 1
const importSubGroup1InDB = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const records = data
            .split('\n')
            .filter(row => row.trim() !== '') // Remove empty rows
            .map(row => row.split(',').map(col => col.trim())); // Split by commas and trim spaces

        // Validate file format
        if (records.some(record => record.length !== 3)) {
            throw new Error('Invalid file format. Each row must have exactly 3 fields: mainGroupCode, name, code.');
        }

        const query = 'INSERT INTO sub_group1 (main_group_code, name, code) VALUES ?';
        const [result] = await pool.query(query, [records]);
        return result;
    } catch (error) {
        console.error('Error importing Sub Group 1:', error);
        throw error;
    }
};


// Export Sub Group 1
const exportSubGroup1FromDB = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM sub_group1');
        const filePath = path.join(__dirname, '../exports/sub_group1.csv');

        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const csvContent = rows.map(row => Object.values(row).join(',')).join('\n');
        fs.writeFileSync(filePath, csvContent);

        return filePath;
    } catch (error) {
        console.error('Error exporting Sub Group 1:', error);
        throw error;
    }
};

module.exports = {
    createSubGroup1,
    searchSubGroup1InDB,
    importSubGroup1InDB,
    exportSubGroup1FromDB,
};
