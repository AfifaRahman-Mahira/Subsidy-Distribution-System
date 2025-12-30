const db = require('../utils/db');

const User = {
  create: (userData, callback) => {
    const { name, email, password, role } = userData;
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, role], callback);
  },
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }
};

module.exports = User;
