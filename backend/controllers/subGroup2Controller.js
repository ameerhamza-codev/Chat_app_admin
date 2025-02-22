const fs = require('fs');
const { parse } = require('csv-parse');
const { 
    createSubGroup2,
      exportSubGroup2Data 
    } = require('../models/subGroup2Model');
const pool = require('../config/database');

// Add Sub Group 2
exports.addSubGroup2 = async (req, res) => {
    const { mainGroupCode, subGroup1Code, name } = req.body;
    if (!mainGroupCode || !subGroup1Code || !name) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        // Get the latest code for the given subGroup1Code
        const [latestCode] = await pool.query('SELECT code FROM sub_group2 WHERE sub_group1_code = ? ORDER BY code DESC LIMIT 1', [subGroup1Code]);

        // Check if we have a valid latest code; if not, initialize the new code to `-001`
        let newCode;
        if (latestCode && latestCode.code) {
            const codeParts = latestCode.code.split('-');  // Split the code into parts
            const newCodePart = (parseInt(codeParts[1], 10) + 1).toString().padStart(3, '0');  // Increment the second part of the code and ensure it has three digits
            newCode = `${subGroup1Code}-${newCodePart}`;
        } else {
            newCode = `${subGroup1Code}-001`;  // If no code exists, set the first code as `-001`
        }

        // Create the new SubGroup2 with the auto-generated code
        const result = await createSubGroup2(mainGroupCode, subGroup1Code, name, newCode);
        res.status(201).json({ message: 'Sub Group 2 added successfully', result });
    } catch (error) {
        console.error('Error adding Sub Group 2:', error);
        res.status(500).json({ error: 'Failed to add Sub Group 2', details: error.message });
    }
};
  
// Search Sub Group 2
exports.searchSubGroup2 = async (req, res) => {
    const { query = '', filter = '' } = req.query;

    let sqlQuery = 'SELECT id, main_group_code, sub_group1_code, name, code FROM sub_group2 WHERE 1=1';  // Include code here
    const params = [];

    // Filter based on the selected filter
    if (filter === 'mainGroupCode') {
        sqlQuery += ' AND main_group_code = ?'; // Exact match for main group code
        params.push(query);
    } else if (filter === 'subGroup1Code') {
        sqlQuery += ' AND sub_group1_code = ?'; // Exact match for sub group 1 code
        params.push(query);
    } else if (filter === 'name') {
        sqlQuery += ' AND name = ?'; // Exact match for sub group 2 name
        params.push(query);
    }

    try {
        const [rows] = await pool.query(sqlQuery, params);
        res.status(200).json(rows); // Return filtered rows
    } catch (error) {
        console.error('Error executing search:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

  
  


// Export Sub Group 2
exports.exportSubGroup2 = async (req, res) => {
    try {
        const filePath = await exportSubGroup2Data();

        if (fs.existsSync(filePath)) {
            return res.download(filePath, 'sub_group2.csv', (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    return res.status(500).json({ error: 'Failed to export Sub Group 2' });
                }
            });
        } else {
            return res.status(404).json({ error: 'Export file not found' });
        }
    } catch (error) {
        console.error('Error exporting Sub Group 2:', error.message);
        return res.status(500).json({ error: 'Failed to export Sub Group 2', details: error.message });
    }
};

// Import Sub Group 2
exports.importSubGroup2 = async (req, res) => {
    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded. Please attach a valid file.' });
    }

    const file = req.files.file;
    const filePath = `${__dirname}/uploads/${file.name}`;

    try {
        file.mv(filePath, async (err) => {
            if (err) return res.status(500).json({ error: 'Failed to upload file' });

            const rows = [];
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter: ',', from_line: 2 }))
                .on('data', async (row) => {
                    const [mainGroupCode, subGroup1Code, name, code] = row;
                    rows.push({ mainGroupCode, subGroup1Code, name, code });
                })
                .on('end', async () => {
                    try {
                        for (const row of rows) {
                            await createSubGroup2(row.mainGroupCode, row.subGroup1Code, row.name, row.code);
                        }
                        fs.unlinkSync(filePath);
                        res.status(200).json({ message: 'File imported successfully' });
                    } catch (err) {
                        console.error('Error saving data to DB:', err);
                        res.status(500).json({ error: 'Failed to save imported data' });
                    }
                })
                .on('error', (err) => {
                    console.error('Error processing file:', err);
                    res.status(500).json({ error: 'Failed to process file' });
                });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error processing file' });
    }
};
exports.getSubGroup2 = async (req, res) => {
    const { query = '', filter = '' } = req.query;

    let sqlQuery = 'SELECT id, main_group_code, sub_group1_code, name, code FROM sub_group2 WHERE 1=1';
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
    } else if (filter === 'sub_group1_code' && query) {
        sqlQuery += ' AND sub_group1_code LIKE ?';
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
exports.deleteSubGroup2 = async (req, res) => {
    const { id } = req.params; // Extract the ID from the URL

    try {
        const [result] = await pool.query('DELETE FROM sub_group2 WHERE id = ?', [id]); // Database deletion query

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sub Group 2 not found' }); // If no rows are affected
        }

        res.status(200).json({ message: 'Sub Group 2 deleted successfully' });
    } catch (error) {
        console.error('Error deleting Sub Group 2:', error);
        res.status(500).json({ error: 'Failed to delete Sub Group 2' });
    }
};

exports.updateSubGroup2 = async (req, res) => {
    const { mainGroupCode, subGroup1Code, name } = req.body;
  
    // Validate required fields for editing
    if (!mainGroupCode || !subGroup1Code || !name) {
      return res.status(400).json({ error: "All fields are required for editing Sub Group 2!" });
    }
  
    try {
      const query = `
        UPDATE sub_group2
        SET main_group_code = ?, sub_group1_code = ?, name = ?
        WHERE id = ?
      `;
      const [result] = await pool.execute(query, [mainGroupCode, subGroup1Code, name, req.params.id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Sub Group 2 not found!" });
      }
  
      res.status(200).json({ message: "Sub Group 2 updated successfully!" });
    } catch (error) {
      console.error("Error updating Sub Group 2:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
exports.getSubGroups2ByMainGroup = async (req, res) => {
    const { groupId } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT id, main_group_code, sub_group1_code, name, code FROM sub_group2 WHERE main_group_code = ?',
            [groupId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No Sub Group 2 found for the provided Main Group ID' });
        }

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching Sub Group 2:', error);
        res.status(500).json({ error: 'Failed to fetch Sub Group 2' });
    }
};

