import express from 'express';
import authRoutes from './v1/authRoutes.js';
import employeeRoutes from './v1/employeeRoutes.js';
import leaveRoutes from './v1/leaveRoutes.js';
import operationRoutes from './v1/operationRoutes.js';
import incidentRoutes from './v1/incidentRoutes.js';
import adminRoutes from './v1/adminRoutes.js';
import { testDatabaseConnection } from '../db/index.js';

const router = express.Router();

// Mount routes
router.use('/v1/auth', authRoutes);
router.use('/v1/employee', employeeRoutes);
router.use('/v1/leave', leaveRoutes);
// router.use('/v1/ops', operationRoutes);
// router.use('/v1/incident', incidentRoutes);
router.use('/v1/admin', adminRoutes);


// Basic test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Test database connection
router.get('/test-db', testDatabaseConnection);

export default router;
