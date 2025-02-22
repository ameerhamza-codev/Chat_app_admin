const SubGroup4Model = require('../models/subGroup4Model');
const db = require('../config/database'); // Update the path as needed
const pool = require('../config/database'); 
// Add Sub Group 4 Data
exports.addSubGroup4 = async (req, res) => {
    const { mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, name } = req.body;
    if (!mainGroupCode || !subGroup1Code || !subGroup2Code || !subGroup3Code || !name) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    try {
        // Get the latest code for the given subGroup3Code
        const [latestCodeResult] = await db.query('SELECT code FROM sub_group4 WHERE sub_group3_code = ? ORDER BY code DESC LIMIT 1', [subGroup3Code]);

        // Check if we have any result from the query
        if (!latestCodeResult || !latestCodeResult.length) {
            // If no result found, initialize the code to XYZ-001
            var newCode = `${subGroup3Code}-001`;
        } else {
            // Otherwise, split the latest code and increment it
            const latestCode = latestCodeResult[0].code; // Get the code from the first result
            const codeParts = latestCode.split('-');
            const lastPart = codeParts[codeParts.length - 1]; // Get the last part of the code
            const newCodeNumber = (parseInt(lastPart, 10) + 1).toString().padStart(3, '0'); // Increment and format as 3 digits
            codeParts[codeParts.length - 1] = newCodeNumber; // Replace the last part with the new code
            newCode = codeParts.join('-'); // Join all parts together
        }

        // Create Sub Group 4 with the generated new code
        const result = await SubGroup4Model.createSubGroup4(mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, name, newCode);
        res.status(201).json({ message: 'Sub Group 4 added successfully', result });
    } catch (error) {
        console.error('Error adding Sub Group 4:', error);
        res.status(500).json({ error: 'Failed to add Sub Group 4', details: error.message });
    }
};


// Search Sub Group 4 Data
exports.searchSubGroup4 = async (req, res) => {
    try {
        const { query = '', filter = '' } = req.query;

        // Allowed filters for Sub Group 4
        const allowedFilters = [
            'main_group_code',
            'sub_group1_code',
            'sub_group2_code',
            'sub_group3_code',
            'name',
            'code',
        ];

        // Validate the filter column
        if (!allowedFilters.includes(filter)) {
            return res.status(400).json({ error: 'Invalid filter column specified' });
        }

        const sql = `
            SELECT id, main_group_code AS mainGroupCode, sub_group1_code AS subGroup1Code,
                   sub_group2_code AS subGroup2Code, sub_group3_code AS subGroup3Code,
                   name, code
            FROM sub_group4
            WHERE ${filter} LIKE ?
        `;

        const queryParams = [`%${query}%`];
        
        const [results] = await db.execute(sql, queryParams); // Use db.execute
        res.status(200).json(results);
    } catch (error) {
        console.error('Search Sub Group 4 Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch All Sub Group 4 Data
exports.fetchAllSubGroup4 = async (req, res) => {
    try {
        const [results] = await SubGroup4Model.fetchAll();
        res.status(200).json(results);
    } catch (error) {
        console.error('Fetch Sub Group 4 Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Sub Group 4 Data
exports.deleteSubGroup4 = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM sub_group4 WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sub Group 4 not found.' });
        }

        res.status(200).json({ message: 'Sub Group 4 deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Sub Group 4:', error);
        res.status(500).json({ error: 'Failed to delete Sub Group 4.' });
    }
};

// Update Sub Group 4 Data
exports.updateSubGroup4 = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            mainGroupCode,
            subGroup1Code,
            subGroup2Code,
            subGroup3Code,
            name,
            code,
        } = req.body;

        if (!name || !code) {
            return res.status(400).json({ error: 'Name and Code are required!' });
        }

        await SubGroup4Model.update(id, {
            mainGroupCode,
            subGroup1Code,
            subGroup2Code,
            subGroup3Code,
            name,
            code,
        });

        res.status(200).json({ message: 'Sub Group 4 updated successfully!' });
    } catch (error) {
        console.error('Update Sub Group 4 Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Export Sub Group 4 Data
exports.exportSubGroup4 = async (req, res) => {
    try {
        // Fetch data from the database
        const data = await db.query('SELECT * FROM sub_group4'); // Update query as per your database
        if (!data.length) {
            return res.status(404).json({ error: 'No data available for export.' });
        }

        // Convert data to CSV format
        const header = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(',')).join('\n');
        const csvContent = `${header}\n${rows}`;

        // Set headers and send response
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="sub_group4.csv"');
        res.status(200).send(csvContent);
    } catch (error) {
        console.error('Error exporting Sub Group 4:', error);
        res.status(500).json({ error: 'Failed to export Sub Group 4 data.' });
    }
};
