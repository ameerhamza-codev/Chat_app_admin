const Occupation = require('../models/occupationModel');
const { Parser } = require('json2csv'); // For export functionality
const db = require('../config/database'); // Update the path if necessary


exports.addOccupation = async (req, res) => {
    try {
        const { code, name, type } = req.body;

        // Validate inputs
        if (!code || !name || !type) {
            return res.status(400).json({ error: 'Code, Name, and Type are required.' });
        }

        // Check if the occupation already exists
        const existingOccupations = await Occupation.getOccupationByCode(code); // It returns an array
        if (existingOccupations.length > 0) {
            return res.status(200).json({ message: 'Occupation already exists, no new entry added.' });
        }

        // Add occupation to the database
        const result = await Occupation.addOccupation(code, name, type);

        const insertedId = result.insertId;
        const insertedRecord = { id: insertedId, code, name, type };

        // Send success response
        return res.status(201).json({ message: 'Occupation added successfully.', data: insertedRecord });
    } catch (error) {
        console.error('Error adding occupation:', error);

        // Check for duplicate entry error and handle it
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: `Occupation with name '${req.body.name}' already exists.` });
        }

        return res.status(500).json({ error: 'An error occurred while adding the occupation.' });
    }
};

exports.getOccupations = async (req, res) => {
    try {
        const occupations = await Occupation.getAllOccupations();
        res.status(200).json(occupations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching occupations.' });
    }
};

exports.searchOccupations = async (req, res) => {
    try {
        const { keyword } = req.query;
        const results = await Occupation.searchOccupations(keyword || '');
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching occupations.' });
    }
};

exports.exportOccupations = async (req, res) => {
    try {
        const occupations = await Occupation.getAllOccupations();
        const fields = ['id', 'name', 'type', 'created_at'];
        const json2csv = new Parser({ fields });
        const csv = json2csv.parse(occupations);

        res.header('Content-Type', 'text/csv');
        res.attachment('occupations.csv');
        res.send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while exporting occupations.' });
    }
};

exports.importOccupations = async (req, res) => {
    try {
        const occupations = req.body.occupations; // Expect an array of objects
        const data = occupations.map((occ) => [occ.name, occ.type]);
        await Occupation.bulkInsert(data);
        res.status(201).json({ message: 'Occupations imported successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while importing occupations.' });
    }
};

exports.deleteOccupation = async (req, res) => {
    console.log('Request Params:', req.params);
    try {
        const { id } = req.params;

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ error: 'ID is required.' });
        }

        // Delete query
        const query = 'DELETE FROM occupations WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        // Check if the occupation exists
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Occupation not found.' });
        }

        res.status(200).json({ message: 'Occupation deleted successfully.' });
    } catch (error) {
        console.error('Error deleting occupation:', error);
        res.status(500).json({ error: 'An error occurred while deleting the occupation.' });
    }
};

exports.updateOccupation = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, name, type } = req.body;

        // Validate inputs
        if (!id || !code || !name || !type) {
            return res.status(400).json({ error: 'ID, Code, Name, and Type are required.' });
        }

        const query = 'UPDATE occupations SET code = ?, name = ?, type = ? WHERE id = ?';
        const [result] = await db.execute(query, [code, name, type, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Occupation not found.' });
        }

        res.status(200).json({ message: 'Occupation updated successfully.' });
    } catch (error) {
        console.error('Error updating occupation:', error);
        res.status(500).json({ error: 'An error occurred while updating the occupation.' });
    }
};
