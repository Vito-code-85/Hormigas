import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

function crearPrismaClient(): PrismaClient {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter })
}

const prisma = global.prisma ?? crearPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
