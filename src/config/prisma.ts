import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
  log: ['error', 'warn']
});

prisma.$on('error', (e: any) => {
  console.error('Prisma Client error:', e);
});

export default prisma;