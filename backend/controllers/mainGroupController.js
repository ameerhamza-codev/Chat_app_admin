const { createMainGroup, getMainGroups, deleteMainGroupById, updateMainGroupById } = require('../models/mainGroupModel');

// Add a new Main Group
exports.addMainGroup = async (req, res) => {
    console.log('Received Request Body:', req.body);

    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({ error: 'Name and code are required' });
    }

    try {
        const result = await createMainGroup(name, code); // Log results for debugging
        console.log('Database Insert Result:', result);
        res.status(201).json({ message: 'Main Group added successfully', id: result.insertId });
    } catch (error) {
        console.error('Error adding Main Group:', error);
        res.status(500).json({ error: 'Failed to add Main Group' });
    }
};

// Get all Main Groups
exports.getAllMainGroups = async (req, res) => {
    try {
        const groups = await getMainGroups();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching Main Groups:', error);
        res.status(500).json({ error: 'Failed to fetch Main Groups' });
    }
};

// Delete a Main Group
exports.deleteMainGroup = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteMainGroupById(id);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Main Group deleted successfully' });
        } else {
            res.status(404).json({ error: 'Main Group not found' });
        }
    } catch (error) {
        console.error('Error deleting Main Group:', error);
        res.status(500).json({ error: 'Failed to delete Main Group' });
    }
};

// Edit a Main Group
exports.editMainGroup = async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;

    if (!name || !code) {
        return res.status(400).json({ error: 'Name and code are required' });
    }

    try {
        const result = await updateMainGroupById(id, name, code);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Main Group updated successfully' });
        } else {
            res.status(404).json({ error: 'Main Group not found' });
        }
    } catch (error) {
        console.error('Error updating Main Group:', error);
        res.status(500).json({ error: 'Failed to update Main Group' });
    }
};
