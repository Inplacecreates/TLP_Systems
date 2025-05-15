import express from 'express';
import authRoutes from './authRoutes.js';
import employeeRoutes from './employeeRoutes.js';
import leaveRoutes from './leaveRoutes.js';
import incidentRoutes from './incidentRoutes.js';
import operationRoutes from './operationRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/employee', employeeRoutes);
router.use('/leave', leaveRoutes);
router.use('/incident', incidentRoutes);
router.use('/ops', operationRoutes);
router.use('/admin', adminRoutes);

export default router;
