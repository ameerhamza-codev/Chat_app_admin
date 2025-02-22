const additionalRespModel = require('../models/additionalRespModel');

// Get all responsibilities
const getAllResponsibilities = async (req, res) => {
    try {
        const responsibilities = await additionalRespModel.getAllResponsibilities();
        res.json(responsibilities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch responsibilities' });
    }
};

// Add a new responsibility
const addResponsibility = async (req, res) => {
    try {
        const { code, name, type } = req.body;
        if (!code || !name || !type) {
            return res.status(400).json({ error: 'Code, Name, and Type are required' });
        }
        const result = await additionalRespModel.addResponsibility(req.body);
        res.status(201).json({
            message: 'Responsibility added successfully',
            id: result.insertId,
        });
    } catch (error) {
        console.error('Error adding responsibility:', error);

        // Check if it's a duplicate entry error from MySQL
        if (error.code === 'ER_DUP_ENTRY') {
            return res
                .status(409)
                .json({ error: 'Duplicate entry. Please use unique values.' });
        }

        // Otherwise, send a generic 500 error
        res.status(500).json({ error: 'Failed to add responsibility' });
    }
};



// Update a responsibility
const updateResponsibility = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format. ID must be a number.' });
        }

        if (!name || !type) {
            return res.status(400).json({ error: 'Name and Type are required.' });
        }

        const result = await additionalRespModel.updateResponsibility(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Responsibility not found.' });
        }

        res.json({ message: 'Responsibility updated successfully.' });
    } catch (error) {
        console.error('Error updating responsibility:', error);
        res.status(500).json({ error: 'Failed to update responsibility.' });
    }
};


// Delete a responsibility
const deleteResponsibility = async (req, res) => {
    try {
        const { id } = req.params;
        await additionalRespModel.deleteResponsibility(id);
        res.json({ message: 'Responsibility deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete responsibility' });
    }
};

module.exports = {
    getAllResponsibilities,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility
};
