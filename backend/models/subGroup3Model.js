const pool = require('../config/database');

const createSubGroup3 = async (mainGroupCode, subGroup1Code, subGroup2Code, name, code) => {
    try {
        const query = `INSERT INTO sub_group3 (main_group_code, sub_group1_code, sub_group2_code, name, code)
                       VALUES (?, ?, ?, ?, ?)`;
        const [result] = await pool.execute(query, [mainGroupCode, subGroup1Code, subGroup2Code, name, code]);
        return result;
    } catch (error) {
        console.error('Error creating Sub Group 3:', error);
        throw error;
    }
};

const getSubGroup3ByMainGroup = async (mainGroupCode, limit = 100, offset = 0) => {
    try {
        const query = `
            SELECT * FROM sub_group3 
            WHERE main_group_code = ? 
            LIMIT ? OFFSET ?
        `;
        const [rows] = await pool.execute(query, [mainGroupCode, limit, offset]);
        return rows;
    } catch (error) {
        console.error('Error fetching Sub Group 3 by Main Group:', error);
        throw error;
    }
};

const bulkInsertSubGroup3 = async (data) => {
    try {
        const query = `
            INSERT INTO sub_group3 (main_group_code, sub_group1_code, sub_group2_code, name, code)
            VALUES ?
        `;
        const values = data.map(({ mainGroupCode, subGroup1Code, subGroup2Code, name, code }) => [
            mainGroupCode,
            subGroup1Code,
            subGroup2Code,
            name,
            code,
        ]);
        const [result] = await pool.query(query, [values]);
        return result;
    } catch (error) {
        console.error('Error bulk inserting Sub Group 3:', error);
        throw error;
    }
};

const fetchSubGroup3ForExport = async (columns = '*', limit = 100, offset = 0) => {
    try {
        const query = `SELECT ${columns} FROM sub_group3 LIMIT ? OFFSET ?`;
        const [rows] = await pool.execute(query, [limit, offset]);
        return rows;
    } catch (error) {
        console.error('Error fetching Sub Group 3 for export:', error);
        throw error;
    }
};

module.exports = { 
    createSubGroup3, 
    getSubGroup3ByMainGroup, 
    bulkInsertSubGroup3, 
    fetchSubGroup3ForExport 
};
