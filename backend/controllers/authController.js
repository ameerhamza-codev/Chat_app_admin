const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register User - now includes email for registration
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(400).json({ error: 'Database error or user already exists' });
    }
};

// Login User - now updated to use email for login
exports.loginUser = async (req, res) => {

    const { email, password } = req.body;
console.log('Login Request Body:', req.body);
    try {
        // Check if the user exists using email
        const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token if login is successful
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    // Since JWT is stateless, we can't invalidate it on the server.
    // The client needs to handle the token deletion.
    res.json({ message: 'Logout successful' });
};
