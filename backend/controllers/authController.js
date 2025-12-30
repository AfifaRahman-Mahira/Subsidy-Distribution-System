const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Registration
exports.register = (req, res) => {
  console.log('Register request body:', req.body); // debug

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ message: 'All fields are required' });

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: err.message });

      User.create({ name, email, password: hashedPassword, role }, (err, result) => {
        console.log('Insert err:', err, 'Result:', result); // DB insert status
        if (err) return res.status(500).json({ message: err.message });
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

// Login
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

      res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  });
};
