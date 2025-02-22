const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
