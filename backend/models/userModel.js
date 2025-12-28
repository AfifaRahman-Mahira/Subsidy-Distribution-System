const db = require('../utils/db');

async function createUser(name, email, password) {
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return result;
}

async function getUserByEmail(email) {
    const [rows] = await db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
}

module.exports = { createUser, getUserByEmail };
