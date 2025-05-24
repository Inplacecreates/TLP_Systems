import { beforeAll, beforeEach, afterAll, jest } from '@jest/globals';
import dotenv from 'dotenv';
import { prisma } from '../db/index.js';

dotenv.config({ path: '.env.test' });

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    const tablenames = await prisma.$queryRaw`
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname='public' 
    AND tablename != '_prisma_migrations';
  `;

    for (const { tablename } of tablenames) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`);
    }
});

afterAll(async () => {
    await prisma.$disconnect();
});

// Global test timeout
jest.setTimeout(30000);

export { prisma };
