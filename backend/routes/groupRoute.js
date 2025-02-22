const express = require('express');
const router = express.Router();
const pool = require('../config/database');  // Import the pool created in database.js

// API route to fetch all subgroups (1, 2, 3, and 4) based on the main_group_code
router.get('/subgroups/:mainGroupCode', async (req, res) => {
    const { mainGroupCode } = req.params;
    console.log(`Received request for mainGroupCode: ${mainGroupCode}`);  // Log received request

    try {
        // Log before the queries to ensure they are running
        console.log(`Executing query for Sub Group 1 with main_group_code = '${mainGroupCode}'`);

        // Query to fetch Sub Group 1 data
        const [subGroup1Data] = await pool.query('SELECT * FROM sub_group1 WHERE main_group_code = ?', [mainGroupCode]);
        console.log('Sub Group 1 Data:', subGroup1Data);

        // Query to fetch Sub Group 2 data
        const [subGroup2Data] = await pool.query('SELECT * FROM sub_group2 WHERE main_group_code = ?', [mainGroupCode]);
        console.log('Sub Group 2 Data:', subGroup2Data);

        // Query to fetch Sub Group 3 data
        const [subGroup3Data] = await pool.query('SELECT * FROM sub_group3 WHERE main_group_code = ?', [mainGroupCode]);
        console.log('Sub Group 3 Data:', subGroup3Data);

        // Query to fetch Sub Group 4 data
        const [subGroup4Data] = await pool.query('SELECT * FROM sub_group4 WHERE main_group_code = ?', [mainGroupCode]);
        console.log('Sub Group 4 Data:', subGroup4Data);

        // Check if no data is found in all sub-groups
        if (subGroup1Data.length === 0 && subGroup2Data.length === 0 && subGroup3Data.length === 0 && subGroup4Data.length === 0) {
            console.log('No subgroups found for this main group code');
            return res.status(404).json({ message: 'No subgroups found for this main group code' });
        }

        // Send back the data for all sub-groups
        res.json({
            subGroup1: subGroup1Data,
            subGroup2: subGroup2Data,
            subGroup3: subGroup3Data,
            subGroup4: subGroup4Data
        });

    } catch (err) {
        console.error('Error executing query:', err);  // Log any query error
        res.status(500).json({ message: 'Error executing query' });
    }
});

module.exports = router;
