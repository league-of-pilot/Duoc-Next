import { PrismaClient } from '@prisma/client'

import { envConfig } from '@app/const/config.const'

// www.prisma.io/docs/orm/reference/prisma-client-reference#datasourceurl
export const prisma = new PrismaClient({
  datasourceUrl: envConfig.DATABASE_URL,
  log: ['info']
})
