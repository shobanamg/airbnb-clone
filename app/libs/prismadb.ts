import { PrismaClient } from '@prisma/client';

declare global {
  let prisma: PrismaClient | undefined;
}

// @ts-ignore
const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  globalThis.prisma = client;
}

export default client;
