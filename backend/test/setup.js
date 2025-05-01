const { prisma, clearTestData } = require('./helpers');

beforeAll(async () => {
    // Ensure we're using the test database
    if (!process.env.DATABASE_URL.includes('test')) {
        throw new Error('Tests must be run against a test database!');
    }

    // Clean database and run migrations
    console.log('Setting up test database...');
    try {
        await prisma.$executeRaw`DROP SCHEMA public CASCADE`;
        await prisma.$executeRaw`CREATE SCHEMA public`;
        const { execSync } = require('child_process');
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log('Database setup complete');
    } catch (error) {
        console.error('Database setup error:', error);
        throw error;
    }
});

afterAll(async () => {
    console.log('Cleaning up test data...');
    await clearTestData();
    await prisma.$disconnect();
});

beforeEach(async () => {
    // Clear test data before each test
    console.log('Clearing test data before test...');
    await clearTestData();
});
