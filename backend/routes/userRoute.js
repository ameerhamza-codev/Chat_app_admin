const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Correctly importing the User model

// Example: Get all users from the database
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();  // Fetch all users from the database using Sequelize
    res.json(users);  // Respond with the list of users
  } catch (err) {
    console.log('Error fetching users: ', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Example: Create a new user
router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });  // Create a new user
    res.status(201).json(user);  // Respond with the created user
  } catch (err) {
    console.log('Error creating user: ', err);
    res.status(500).json({ message: 'Error creating user' });
  }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      // Check if the password matches (you can hash passwords in a real app)
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Respond with success (you can also generate a JWT token here)
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      console.log('Error during login: ', err);
      res.status(500).json({ message: 'Error during login' });
    }
  });
  

module.exports = router;
