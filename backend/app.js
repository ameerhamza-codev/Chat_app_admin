require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pool = require('./config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
