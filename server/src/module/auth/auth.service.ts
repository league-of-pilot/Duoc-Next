import { PRISMA_ERR_CODE } from '@app/const/error.const'
import { SESSION_TOKEN_EXPIRES_IN } from '@app/const/global.const'
import { prisma } from '@app/database'
import { EntityError } from '@app/plugins/error.class'
import { isPrismaClientKnownRequestError } from '@app/plugins/error.type'
import { hashPassword } from '@app/utils/crypto'
import { signSessionToken } from '@app/utils/jwt'
import { addMilliseconds } from '@app/utils/time.utils'

import { RegisterBodyType } from './register.schema'

export const registerService = async (body: RegisterBodyType) => {
  try {
    const hashedPassword = await hashPassword(body.password)
    const account = await prisma.account.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    })
    const sessionToken = signSessionToken({
      userId: account.id
    })
    const expiresAt = addMilliseconds(SESSION_TOKEN_EXPIRES_IN)
    const session = await prisma.session.create({
      data: {
        accountId: account.id,
        token: sessionToken,
        expiresAt
      }
    })
    return {
      account,
      session
    }
  } catch (error: any) {
    if (isPrismaClientKnownRequestError(error)) {
      if (error.code === PRISMA_ERR_CODE.UNIQUE_CONSTRAINT_VIOLATION) {
        throw new EntityError([{ field: 'email', message: 'Email đã tồn tại' }])
      }
    }
    throw error
  }
}
