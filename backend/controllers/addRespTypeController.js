const ResponsibilityType = require('../models/addresponsibilitytypeModel');

exports.addResponsibilityType = async (req, res) => {
    try {
        const { name } = req.body;

        // Validation: Check if the name is provided
        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Responsibility type name is required.' });
        }

        // Attempt to create the responsibility type
        await ResponsibilityType.create(name.trim());
        return res.status(201).json({ message: 'Responsibility type added successfully.' });

    } catch (error) {
        console.error('Error adding responsibility type:', error);

        // Handle duplicate entry error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                error: 'Responsibility type already exists. Please use a different name.',
            });
        }

        // Handle other server errors
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

exports.getResponsibilityTypes = async (req, res) => {
    try {
        const types = await ResponsibilityType.getAll();
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteResponsibilityType = async (req, res) => {
    try {
        const { id } = req.params;
        await ResponsibilityType.delete(id); // Adjust 'delete' based on your ORM or DB method
        res.status(200).json({ message: 'Responsibility type deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete responsibility type.' });
    }
};