require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // Create test admin
    await prisma.user.create({
        data: {
            email: 'admin@test.com',
            password: await bcrypt.hash('admin123', 10),
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            department: 'Administration',
            contractType: 'PERMANENT',
            leaveBalance: 30
        },
    });

    // Create test regular user
    await prisma.user.create({
        data: {
            email: 'user@test.com',
            password: await bcrypt.hash('user123', 10),
            firstName: 'Regular',
            lastName: 'User',
            role: 'USER',
            department: 'General',
            contractType: 'PERMANENT',
            leaveBalance: 30
        },
    });

    console.log('Test users created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
