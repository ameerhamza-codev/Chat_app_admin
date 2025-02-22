const db = require('../config/database'); // Assuming you use mysql2 with promises

// Controller to fetch all announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM announcements ORDER BY created_at DESC');
        res.status(200).json({ announcements: rows });
    } catch (err) {
        console.error('Error fetching announcements:', err);
        res.status(500).json({ message: 'Error fetching announcements' });
    }
};

// Controller to add a new announcement
exports.addAnnouncement = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Announcement content is required' });
    }

    try {
        const [result] = await db.execute('INSERT INTO announcements (content) VALUES (?)', [content]);
        res.status(201).json({ message: 'Announcement added successfully', id: result.insertId });
    } catch (err) {
        console.error('Error adding announcement:', err);
        res.status(500).json({ message: 'Error adding announcement' });
    }
};
