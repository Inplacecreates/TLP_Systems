import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/db.js';
import config from '../config/index.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.security.jwtSecret,
            { expiresIn: config.security.jwtExpiry }
        );

        // Send response without password
        const { password: _, ...userWithoutPassword } = user;
        res.json({
            user: userWithoutPassword,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Error logging in'
        });
    }
};

export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, department, role = 'EMPLOYEE' } = req.body;

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
                role,
                status: 'ACTIVE',
                contractType: 'PERMANENT'
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                department: true,
                role: true,
                status: true,
                contractType: true,
                createdAt: true
            }
        });

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.security.jwtSecret,
            { expiresIn: config.security.jwtExpiry }
        );

        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Error registering user'
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                department: true,
                role: true,
                status: true,
                contractType: true,
                createdAt: true
            }
        });

        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            message: 'Error fetching profile'
        });
    }
};
