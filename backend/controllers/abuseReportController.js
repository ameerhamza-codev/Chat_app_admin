const db = require('../config/database'); // Database connection

exports.getAbuseReports = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM abuse_reports');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.addAbuseReport = async (req, res) => {
    const { reporter, abuser, topic, report } = req.body;
    try {
        await db.execute(
            'INSERT INTO abuse_reports (reporter, abuser, topic, report) VALUES (?, ?, ?, ?)',
            [reporter, abuser, topic, report]
        );
        res.status(201).json({ message: 'Report added successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.deleteAbuseReport = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM abuse_reports WHERE id = ?', [id]);
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
};
