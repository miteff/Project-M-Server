import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
  log: ['error', 'warn']
});

prisma.$on('error', (e) => {
  console.error('Prisma Client error:', e);
});

export default prisma;