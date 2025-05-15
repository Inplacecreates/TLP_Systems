import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

// Load environment variables
dotenv.config();

export const config = {
    app: {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT || '3001', 10),
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        isTest: process.env.NODE_ENV === 'test'
    },
    db: {
        url: process.env.DATABASE_URL
    },
    security: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiry: process.env.JWT_EXPIRY || '24h'
    },
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    }
};

// Validate required environment variables
const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

export const setupApp = (app) => {
    // CORS middleware
    app.use(cors({
        origin: config.cors.origin
    }));

    // Body parser middleware
    app.use(express.json());

    // Rate limiting middleware
    const limiter = rateLimit({
        windowMs: config.rateLimit.windowMs,
        max: config.rateLimit.maxRequests
    });
    app.use(limiter);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({
            message: 'Something went wrong!',
            error: config.app.isDevelopment ? err.message : undefined
        });
    });

    return app;
};

export default config;
