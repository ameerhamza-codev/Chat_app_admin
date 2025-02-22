const csv = require('csv-parser');
const fs = require('fs');
const db = require('../config/database');
const pool = require('../config/database'); // Adjust path as needed


// Add Sub Group 3
exports.addSubGroup3 = async (req, res) => {
    const { mainGroupCode, subGroup1Code, subGroup2Code, name } = req.body;
    if (!mainGroupCode || !subGroup1Code || !subGroup2Code || !name) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Get the latest code for the given subGroup2Code
        const [rows] = await pool.query('SELECT code FROM sub_group3 WHERE sub_group2_code = ? ORDER BY code DESC LIMIT 1', [subGroup2Code]);

        // Check if rows is empty
        if (rows.length === 0) {
            // If no previous code exists, initialize it
            const newCode = `${subGroup2Code}-001`;
            const query = `
                INSERT INTO sub_group3 (main_group_code, sub_group1_code, sub_group2_code, name, code)
                VALUES (?, ?, ?, ?, ?)
            `;
            await pool.execute(query, [mainGroupCode, subGroup1Code, subGroup2Code, name, newCode]);
            return res.status(201).json({ message: 'Sub Group 3 added successfully with code: ' + newCode });
        }

        // Extract the latest code from the result
        const latestCode = rows[0].code;

        // Split and increment the latest code
        const parts = latestCode.split('-');
        const newCode = `${subGroup2Code}-${String(parseInt(parts[parts.length - 1], 10) + 1).padStart(3, '0')}`;

        // Insert the new Sub Group 3 with the generated code
        const query = `
            INSERT INTO sub_group3 (main_group_code, sub_group1_code, sub_group2_code, name, code)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.execute(query, [mainGroupCode, subGroup1Code, subGroup2Code, name, newCode]);

        res.status(201).json({ message: 'Sub Group 3 added successfully with code: ' + newCode });
    } catch (error) {
        console.error('Error adding Sub Group 3:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};
// Fetch Sub Group 3
exports.getSubGroup3 = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT id, main_group_code, sub_group1_code, sub_group2_code, name, code FROM sub_group3'
        );
        console.log('Sub Group 3 Data:', rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching Sub Group 3:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

// Import Sub Group 3
exports.importSubGroup3 = (req, res) => {
    const filePath = req.file?.path;

    if (!filePath || !filePath.endsWith('.csv')) {
        return res.status(400).json({ message: 'Invalid file format. Please upload a CSV file.' });
    }

    const importedData = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            importedData.push([
                row.main_group_code,
                row.sub_group1_code,
                row.sub_group2_code,
                row.name,
                row.code,
            ]);
        })
        .on('end', async () => {
            try {
                const query = `
                    INSERT INTO sub_group3 (main_group_code, sub_group1_code, sub_group2_code, name, code)
                    VALUES ?
                `;
                await db.query(query, [importedData]);
                res.status(200).json({ message: 'Data imported successfully.' });
            } catch (error) {
                console.error('Error importing data:', error);
                res.status(500).json({ message: 'Failed to import data.' });
            }
        });
};

// Export Sub Group 3
exports.exportSubGroup3 = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM sub_group3');
        const csvData = rows.map(row =>
            `${row.id},${row.main_group_code},${row.sub_group1_code},${row.sub_group2_code},${row.name},${row.code}`
        );
        csvData.unshift('ID,Main Group Code,Sub Group 1 Code,Sub Group 2 Code,Name,Code');
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment;filename=sub_group3_${timestamp}.csv`);
        res.send(csvData.join('\n'));
    } catch (error) {
        console.error('Error exporting data:', error);
        res.status(500).json({ message: 'Failed to export data.' });
    }
};

// Search Sub Group 3
exports.searchSubGroup3 = async (req, res) => {
    const { query, filter } = req.body;

    // List of valid filter fields that are expected in the query
    const validFilters = ['main_group_code', 'sub_group1_code', 'sub_group2_code', 'name', 'code'];

    // Validate filter field
    if (!validFilters.includes(filter)) {
        return res.status(400).json({ message: 'Invalid filter.' });
    }

    try {
        // Construct SQL query dynamically based on the filter selected
        const sqlQuery = `SELECT * FROM sub_group3 WHERE ${filter} LIKE ?`;
        
        // Use prepared statements to prevent SQL injection
        const [rows] = await db.query(sqlQuery, [`%${query}%`]);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error searching Sub Group 3:', error);
        res.status(500).json({ message: 'Search failed.' });
    }
};



// Search Sub Group 2
exports.searchSubGroup2 = async (req, res) => {
    const { mainGroupCode, subGroup1Code } = req.query;

    try {
        const query = `
            SELECT id, main_group_code, sub_group1_code, name, code
            FROM sub_group2
            WHERE main_group_code = ? AND sub_group1_code = ?
        `;
        console.log('Executing Query:', query, [mainGroupCode, subGroup1Code]);
        const [rows] = await db.execute(query, [mainGroupCode, subGroup1Code]);
        console.log('Query Results:', rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error in searchSubGroup2:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// Filter Sub Group 3 based on query parameters
exports.getFilteredSubGroup3Data = async (req, res) => {
    const { mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code } = req.query;

    let query = "SELECT * FROM sub_group3 WHERE 1=1"; // Base query

    // Dynamically add filters based on query parameters
    if (mainGroupCode) {
        query += ` AND main_group_code = ?`;
    }
    if (subGroup1Code) {
        query += ` AND sub_group1_code = ?`;
    }
    if (subGroup2Code) {
        query += ` AND sub_group2_code = ?`;
    }
    if (subGroup3Code) {
        query += ` AND code = ?`;
    }

    try {
        const [rows] = await db.execute(query, [
            mainGroupCode,
            subGroup1Code,
            subGroup2Code,
            subGroup3Code
        ]);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching filtered Sub Group 3:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};
// Delete a Sub Group 3 record by ID
exports.deleteSubGroup3 = async (req, res) => {
    const { id } = req.params; // Extract id from the route parameter

    try {
        // Construct SQL query to delete the Sub Group 3 record
        const sqlQuery = 'DELETE FROM sub_group3 WHERE id = ?';

        // Execute the query
        const [result] = await db.query(sqlQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sub Group 3 not found.' });
        }

        res.status(200).json({ message: 'Sub Group 3 deleted successfully.' });
    } catch (error) {
        console.error('Error deleting Sub Group 3:', error);
        res.status(500).json({ message: 'Failed to delete Sub Group 3.' });
    }
};

// Update Sub Group 3 record by ID
exports.updateSubGroup3 = async (req, res) => {
    const { id } = req.params; // Extract the ID from the request params
    const { mainGroupCode, subGroup1Code, subGroup2Code, name } = req.body; // Extract fields from request body
  
    try {
      // Update the database record
      const sql = `
        UPDATE sub_group3
        SET main_group_code = ?, sub_group1_code = ?, sub_group2_code = ?, name = ?
        WHERE id = ?
      `;
      const [result] = await db.query(sql, [mainGroupCode, subGroup1Code, subGroup2Code, name, id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Sub Group 3 not found' });
      }
  
      res.status(200).json({ message: 'Sub Group 3 updated successfully' });
    } catch (error) {
      console.error('Error updating Sub Group 3:', error);
      res.status(500).json({ message: 'Failed to update Sub Group 3' });
    }
  };
  
