const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const createTestUser = async ({
    email = 'test@example.com',
    password = 'password123',
    role = 'EMPLOYEE',
    status = 'ACTIVE',
    firstName = 'Test',
    lastName = 'User',
    department = 'IT',
    contractType = 'PERMANENT'
} = {}) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role,
            status,
            firstName,
            lastName,
            department,
            contractType
        }
    });
};

const clearTestData = async () => {
    try {
        await prisma.user.deleteMany({
            where: {
                email: {
                    contains: 'test'
                }
            }
        });
    } catch (error) {
        console.error('Error clearing test data:', error);
    }
};

module.exports = {
    createTestUser,
    clearTestData,
    prisma
};
