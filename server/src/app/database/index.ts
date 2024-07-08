import { envConfig } from '@app/const/config.const'
import { PrismaClient } from '@prisma/client'

// www.prisma.io/docs/orm/reference/prisma-client-reference#datasourceurl
export const prisma = new PrismaClient({
  datasourceUrl: envConfig.DATABASE_URL,
  log: ['info']
})
