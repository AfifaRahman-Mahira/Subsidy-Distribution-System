const db = require('../utils/db');

const User = {
  create: (data, callback) => {
    const { name, nid, email, password, role } = data;
    const query = 'INSERT INTO users (name, nid, email, password, role) VALUES (?,?,?,?,?)';
    db.query(query, [name, nid, email, password, role], callback);
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email=?', [email], callback);
  }
};

module.exports = User;
