const db = require('../config/database'); // Ensure you have a MySQL connection setup

// Get reports based on search criteria
exports.getReports = async (req, res) => {
    const { name, email, mobile, city, country, mainGroup, subGroup1, subGroup2, subGroup3, subGroup4 } = req.query;

    let query = `
        SELECT id, name, email, mobile, city, country, main_group, sub_group1, sub_group2, sub_group3, sub_group4
        FROM reports WHERE 1=1
    `;
    const params = [];

    if (name) { query += ' AND name LIKE ?'; params.push(`%${name}%`); }
    if (email) { query += ' AND email LIKE ?'; params.push(`%${email}%`); }
    if (mobile) { query += ' AND mobile LIKE ?'; params.push(`%${mobile}%`); }
    if (city) { query += ' AND city LIKE ?'; params.push(`%${city}%`); }
    if (country) { query += ' AND country LIKE ?'; params.push(`%${country}%`); }
    if (mainGroup) { query += ' AND main_group = ?'; params.push(mainGroup); }
    if (subGroup1) { query += ' AND sub_group1 = ?'; params.push(subGroup1); }
    if (subGroup2) { query += ' AND sub_group2 = ?'; params.push(subGroup2); }
    if (subGroup3) { query += ' AND sub_group3 = ?'; params.push(subGroup3); }
    if (subGroup4) { query += ' AND sub_group4 = ?'; params.push(subGroup4); }

    try {
        const [results] = await db.execute(query, params);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get detailed information for a specific report
exports.getReportDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.execute(`
            SELECT * FROM reports WHERE id = ?
        `, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Report not found' });
        }

        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
