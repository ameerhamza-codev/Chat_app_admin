const fs = require('fs');
const path = require('path');
const pool = require('../config/database');
const { parse } = require('json2csv');

// Create Sub Group 2
const createSubGroup2 = async (mainGroupCode, subGroup1Code, name, code) => {
    try {
        // Insert into sub_group2
        const query = 'INSERT INTO sub_group2 (main_group_code, sub_group1_code, name, code) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [mainGroupCode, subGroup1Code, name, code]);

        // After inserting, retrieve the inserted record to return it (including the generated code)
        const [newSubGroup] = await pool.execute('SELECT * FROM sub_group2 WHERE id = ?', [result.insertId]);
        
        return newSubGroup[0];  // Return the inserted Sub Group data, including the code
    } catch (error) {
        console.error('Error adding Sub Group 2:', error);
        throw error;
    }
};

// Get Sub Group 2 by Criteria
const getSubGroup2ByCriteria = async (mainGroupCode, subGroup1Code, name) => {
    let query = 'SELECT id, main_group_code, sub_group1_code, name, code FROM sub_group2 WHERE 1=1';
    const params = [];

    if (mainGroupCode) {
        query += ' AND main_group_code = ?';
        params.push(mainGroupCode);
    }
    if (subGroup1Code) {
        query += ' AND sub_group1_code = ?';
        params.push(subGroup1Code);
    }
    if (name) {
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }

    try {
        const [rows] = await pool.execute(query, params);
        return rows;
    } catch (error) {
        console.error('Error fetching Sub Group 2:', error);
        throw error;
    }
};

// Export Sub Group 2 Data
const exportSubGroup2Data = async () => {
    try {
        const query = 'SELECT main_group_code, sub_group1_code, name, code FROM sub_group2';
        const [rows] = await pool.execute(query);

        const fields = ['main_group_code', 'sub_group1_code', 'name', 'code'];
        const csv = parse(rows, { fields });

        const filePath = path.resolve(__dirname, '../exports/sub_group2.csv');
        fs.writeFileSync(filePath, csv);

        return filePath;
    } catch (error) {
        console.error('Error exporting Sub Group 2 data:', error.message);
        throw new Error('Failed to export Sub Group 2 data');
    }
};

module.exports = { createSubGroup2, getSubGroup2ByCriteria, exportSubGroup2Data };
