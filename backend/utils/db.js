const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234591',
  database: 'subsidy_db'
});

db.connect((err) => {
  if (err) {
    console.log('DB connection failed:', err);
  } else {
    console.log('DB connected successfully');
  }
});

module.exports = db;
