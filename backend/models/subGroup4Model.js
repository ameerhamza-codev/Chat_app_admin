const db = require('../config/database'); // Correctly using db

const SubGroup4Model = {
    createSubGroup4: async (mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, name, code) => {
        try {
            const query = `INSERT INTO sub_group4 (main_group_code, sub_group1_code, sub_group2_code, sub_group3_code, name, code)
                           VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await db.execute(query, [mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, name, code]);
            return result;
        } catch (error) {
            console.error('Error creating Sub Group 4:', error);
            throw error;
        }
    },

    fetchAll: async () => {
        const query = `SELECT * FROM sub_group4`;
        return db.execute(query); // Using db.execute instead of pool.execute
    },

    search: async (filter, queryValue) => {
        const query = `
            SELECT id, main_group_code AS mainGroupCode, sub_group1_code AS subGroup1Code,
                   sub_group2_code AS subGroup2Code, sub_group3_code AS subGroup3Code,
                   name, code
            FROM sub_group4
            WHERE ${filter} LIKE ?
        `;
        return db.execute(query, [`%${queryValue || ''}%`]); // Using db.execute here
    },

    delete: async (id) => {
        const query = `DELETE FROM sub_group4 WHERE id = ?`;
        return db.execute(query, [id]); // Using db.execute here
    },

    update: async (id, data) => {
        const query = `
            UPDATE sub_group4
            SET main_group_code = ?, sub_group1_code = ?, sub_group2_code = ?, 
                sub_group3_code = ?, name = ?, code = ?
            WHERE id = ?
        `;
        return db.execute(query, [
            data.mainGroupCode || null,
            data.subGroup1Code || null,
            data.subGroup2Code || null,
            data.subGroup3Code || null,
            data.name || null,
            data.code || null,
            id,
        ]); // Using db.execute here
    },
};

module.exports = SubGroup4Model;
