const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');

// Auth routes
router.use('/auth', authRoutes);

// Basic test route
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

module.exports = router;
