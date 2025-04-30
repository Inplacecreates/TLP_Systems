const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./auth.routes');

// Auth routes
router.use('/auth', authRoutes);

// Basic test route
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Test database connection
router.get('/test-db', async (req, res) => {
    try {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany();
        res.json({ 
            message: 'Database connection successful',
            userCount: users.length
        });
    } catch (error) {
        console.error('Database test error:', error);
        res.status(500).json({ 
            message: 'Database connection failed',
            error: error.message
        });
    }
});

module.exports = router;
