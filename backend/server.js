const express = require('express');
const userRoute = require('./routes/userRoute');  // Importing userRoute
const sequelize = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());  // To allow cross-origin requests

// Use userRoute for handling user-related routes
app.use('/api', userRoute);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Sync models and start server
sequelize.sync({force: true})
  .then(() => {
    console.log('Database synced');
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(err => console.log('Error: ' + err));
