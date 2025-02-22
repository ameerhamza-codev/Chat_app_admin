const db = require('../config/database');

// Helper function to convert empty, "Select", undefined, or null values to NULL
const toNullable = (value) => {
    if (
        value === undefined ||
        value === null ||
        value === 'Select' ||
        (typeof value === 'string' && !value.trim())
    ) {
        return null;
    }
    return value;
};

const InviteModel = {};

// Function to update an invited user by ID
InviteModel.updateInviteById = async (id, data) => {
    try {
        const sql = `
            UPDATE invited_users
            SET 
                name = ?, 
                email = ?, 
                mobile = ?, 
                gender = ?, 
                main_group_code = ?, 
                sub_group1_code = ?, 
                sub_group2_code = ?, 
                sub_group3_code = ?, 
                sub_group4_code = ?, 
                additional_responsibility = ?, 
                referrer = ?
            WHERE id = ?
        `;

        const values = [
            data.name,
            data.email,
            data.mobile,
            toNullable(data.gender),
            toNullable(data.mainGroupCode),
            toNullable(data.subGroup1Code),
            toNullable(data.subGroup2Code),
            toNullable(data.subGroup3Code),
            toNullable(data.subGroup4Code),
            data.additionalResponsibility || null,
            data.referrer || null,
            id
        ];

        const [result] = await db.query(sql, values);

        // If no rows are updated, return null to indicate the user wasn't found
        return result.affectedRows > 0 ? result : null;
    } catch (error) {
        console.error('Error updating invite in database:', error);
        throw error;
    }
};

module.exports = InviteModel;
