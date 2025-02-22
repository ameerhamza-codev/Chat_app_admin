const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
require('dotenv/config');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide username and password' });
    }

    try {
        const [rows, fields] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);

        if (!rows || rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '1h' });
        req.session.user = { id: user.id, username: user.username };
        res.json({ token });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const checkAuth = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
};

module.exports = { login, checkAuth, logout };