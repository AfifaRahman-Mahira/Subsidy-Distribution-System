const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // ✅ Import as object

router.post('/register', authController.register); // ✅ exact function reference
router.post('/login', authController.login);

module.exports = router;
