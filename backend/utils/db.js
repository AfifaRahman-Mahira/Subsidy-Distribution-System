const mysql = require('mysql2');
// Explicitly point to .env file in project root
require('dotenv').config({ path: '../.env' });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if(err) console.log('DB connection error:', err);
    else console.log('DB connected');
});

module.exports = db;
