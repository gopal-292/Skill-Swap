import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

// Prisma 7 requires an adapter — built-in drivers were removed.
// Use DATABASE_URL directly (same value used by the Prisma CLI via prisma.config.ts)
const dbUrl = process.env.DATABASE_URL ?? 'file:./dev.db'
const adapter = new PrismaLibSql({ url: dbUrl })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new PrismaClient({ adapter } as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


