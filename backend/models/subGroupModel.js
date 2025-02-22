const db = require('../config/database'); // Import your database connection

const SubGroup = {
    // Fetch subgroups from the database
    fetchSubGroups: async (mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code) => {
        try {
            const [rows] = await db.query(
                `SELECT id, name 
                 FROM sub_groups 
                 WHERE main_group_code = ? 
                 AND (sub_group1_code = ? OR sub_group1_code IS NULL)
                 AND (sub_group2_code = ? OR sub_group2_code IS NULL)
                 AND (sub_group3_code = ? OR sub_group3_code IS NULL)
                 AND (sub_group4_code = ? OR sub_group4_code IS NULL)`,
                [mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code]
            );

            return rows; // Return the fetched rows
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    },
};

module.exports = SubGroup;
