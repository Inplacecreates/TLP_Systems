import { baseController } from './baseController.js';
import { prisma } from '../db/index.js';
import bcrypt from 'bcryptjs';
import { ROLES } from '../utils/rolePermissions.js';

// Get system statistics
export const getSystemStats = async (req, res) => {
  try {
    const [
      totalUsers,
      pendingLeaves,
      pendingIncidents,
      pendingOperations
    ] = await Promise.all([
      prisma.user.count(),
      prisma.leave.count({ where: { status: 'PENDING' } }),
      prisma.incident.count({ where: { status: 'PENDING' } }),
      prisma.operationRequest.count({ where: { status: 'PENDING' } })
    ]);

    res.json({
      statistics: {
        totalUsers,
        pendingLeaves,
        pendingIncidents,
        pendingOperations
      }
    });
  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({ message: 'Error fetching system statistics' });
  }
};

// Manage user accounts
export const manageUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, status, search } = req.query;

    const filters = {
      ...(role && { role }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const result = await baseController.paginate(
      'User',
      filters,
      parseInt(page),
      parseInt(limit)
    );

    res.json(result);
  } catch (error) {
    console.error('Manage users error:', error);
    res.status(500).json({ message: 'Error managing users' });
  }
};

// Create user account
export const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, department, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        department,
        role: role || ROLES.EMPLOYEE,
        status: 'ACTIVE'
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        department: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    // Create audit log
    await baseController.createAuditLog(
      req.user.id,
      'USER_CREATED',
      { userId: user.id, role: user.role }
    );

    res.status(201).json(user);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Update user account
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, department, role, status } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(department && { department }),
        ...(role && { role }),
        ...(status && { status })
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        department: true,
        role: true,
        status: true,
        updatedAt: true
      }
    });

    // Create audit log
    await baseController.createAuditLog(
      req.user.id,
      'USER_UPDATED',
      { userId: id, updates: req.body }
    );

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Reset user password
export const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });

    // Create audit log
    await baseController.createAuditLog(
      req.user.id,
      'PASSWORD_RESET',
      { userId: id }
    );

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

// Get audit logs
export const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, action, startDate, endDate } = req.query;

    let filters = {};
    if (action) filters.action = action;
    if (startDate && endDate) {
      filters.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const result = await baseController.paginate(
      'AuditLog',
      filters,
      parseInt(page),
      parseInt(limit),
      {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    );

    res.json(result);
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ message: 'Error fetching audit logs' });
  }
};
