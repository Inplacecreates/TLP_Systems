import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseConnection(req, res) {
    try {
        const users = await prisma.user.findMany();
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
}

export {
    prisma,
    testDatabaseConnection
};
