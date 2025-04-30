const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { validateLogin } = require('../middleware/validation');

// Login route - same endpoint for all user types
router.post('/login', validateLogin, login);

module.exports = router;
