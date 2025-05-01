const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;
