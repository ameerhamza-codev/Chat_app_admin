const mysql = require('mysql2/promise');
require('dotenv/config');

//sql connection 

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.PORT,
        waitForConnections: true,
        queueLimit: 0
    });
    
module.exports = pool;