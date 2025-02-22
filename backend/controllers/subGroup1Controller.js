const {
    createSubGroup1,
  
    importSubGroup1InDB,
    exportSubGroup1FromDB,
} = require('../models/subGroup1Model');
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

// Add Sub Group 1
exports.addSubGroup1 = async (req, res) => {
    const { mainGroupCode, name, code } = req.body;
    if (!mainGroupCode || !name || !code) {
        return res.status(400).json({ error: 'All fields are required: mainGroupCode, name, code' });
    }

    try {
        const result = await createSubGroup1(mainGroupCode, name, code);
        res.status(201).json({ message: 'Sub Group 1 added successfully', result });
    } catch (error) {
        console.error('Error adding Sub Group 1:', error);
        res.status(500).json({ error: 'Failed to add Sub Group 1', details: error.message });
    }
};
exports.searchSubGroup1 = async (req, res) => {
    const { query = '', filter = '' } = req.query;

    let sqlQuery = 'SELECT id, main_group_code, name, code FROM sub_group1 WHERE 1=1';
    const params = [];

    if (filter === 'name' && query) {
        sqlQuery += ' AND name LIKE ?';
        params.push(`%${query}%`);
    } else if (filter === 'code' && query) {
        sqlQuery += ' AND code LIKE ?';
        params.push(`%${query}%`);
    } else if (filter === 'main_group_code' && query) {
        sqlQuery += ' AND main_group_code LIKE ?';
        params.push(`%${query}%`);
    }

    try {
        const [rows] = await pool.query(sqlQuery, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error executing search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Import Sub Group 1
exports.importSubGroup1 = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded. Please attach a valid file.' });
    }

    try {
        const file = req.files.file;
        const filePath = path.join(__dirname, '../uploads', file.name);

        // Ensure the uploads directory exists
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        // Move the uploaded file to the uploads directory
        await file.mv(filePath);

        // Process the file
        const result = await importSubGroup1InDB(filePath);
        res.status(200).json({ message: 'File imported successfully', result });
    } catch (error) {
        console.error('Error importing Sub Group 1:', error);
        res.status(500).json({ error: 'Failed to import Sub Group 1', details: error.message });
    }
};

// Export Sub Group 1
exports.exportSubGroup1 = async (req, res) => {
    try {
        const filePath = await exportSubGroup1FromDB();
        res.download(filePath, 'sub_group1.csv', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Failed to export Sub Group 1' });
            }
        });
    } catch (error) {
        console.error('Error exporting Sub Group 1:', error);
        res.status(500).json({ error: 'Failed to export Sub Group 1', details: error.message });
    }
};
exports.getSubGroups1ByMainGroup = async (req, res) => {
    const { groupId } = req.params; // Get the group ID from the request parameters

    console.log('Fetching sub-groups for Main Group ID:', groupId); // Log the incoming request

    try {
        const [subGroups] = await pool.query(
            'SELECT * FROM sub_group1 WHERE main_group_id = ?',
            [groupId]
        );
        console.log('Fetched Sub Groups:', subGroups); // Log the fetched sub-groups

        if (subGroups.length === 0) {
            return res.status(404).json({ message: 'No Sub Groups found for this Main Group.' });
        }

        res.status(200).json(subGroups);
    } catch (error) {
        console.error('Error fetching sub-groups:', error); // Log the error details
        res.status(500).json({ error: 'Failed to fetch sub-groups', details: error.message });
    }
};

exports.deleteSubGroup1 = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL

    try {
        const [result] = await pool.query('DELETE FROM sub_group1 WHERE id = ?', [id]); // Database deletion query

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sub Group 1 not found' }); // If no rows are affected
        }

        res.status(200).json({ message: 'Sub Group 1 deleted successfully' });
    } catch (error) {
        console.error('Error deleting Sub Group 1:', error);
        res.status(500).json({ error: 'Failed to delete Sub Group 1' });
    }
};

exports.updateSubGroup1 = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL
    const { name, code } = req.body; // Extract updated data from the request body

    if (!id || !name || !code) {
        return res.status(400).json({ error: 'Name and Code are required!' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE sub_group1 SET name = ?, code = ? WHERE id = ?',
            [name, code, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sub Group 1 not found' });
        }

        res.status(200).json({ message: 'Sub Group 1 updated successfully' });
    } catch (error) {
        console.error('Error updating Sub Group 1:', error);
        res.status(500).json({ error: 'Failed to update Sub Group 1' });
    }
};


