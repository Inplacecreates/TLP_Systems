import express from 'express';
import { testDatabaseConnection } from '../db/db.js';

const router = express.Router();


// Basic test route
router.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Test database connection
router.get("/test-db", async (req, res) => {
  try {
    const users = await testDatabaseConnection(req, res);
    res.json({
      message: "Database connection successful",
      userCount: users.length,
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

export default router;
