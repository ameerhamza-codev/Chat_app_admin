const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register User - now includes additional fields
exports.registerUser = async (req, res) => {
    const {
        username, email, password, mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code,
        name, fatherName, displayName, DOB, landline, companyName, workingCountry, 
        workingCity, occupation, mobile, gender
    } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const [result] = await db.query(
            `INSERT INTO users (username, email, password, mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code, 
             name, fatherName, displayName, DOB, landline, companyName, workingCountry, workingCity, occupation, mobile, gender) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [username, email, hashedPassword, mainGroupCode, subGroup1Code, subGroup2Code, subGroup3Code, subGroup4Code,
            name, fatherName, displayName, DOB, landline, companyName, workingCountry, workingCity, occupation, mobile, gender]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(400).json({ error: 'Database error or user already exists' });
    }
};

// Login User - now returns additional user details
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

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                mainGroupCode: user.mainGroupCode,
                subGroup1Code: user.subGroup1Code,
                subGroup2Code: user.subGroup2Code,
                subGroup3Code: user.subGroup3Code,
                subGroup4Code: user.subGroup4Code,
                name: user.name,
                fatherName: user.fatherName,
                displayName: user.displayName,
                DOB: user.DOB,
                landline: user.landline,
                companyName: user.companyName,
                workingCountry: user.workingCountry,
                workingCity: user.workingCity,
                occupation: user.occupation,
                mobile: user.mobile,
                gender: user.gender
            }
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Logout User
exports.logoutUser = (req, res) => {
    res.json({ message: 'Logout successful' });
};
