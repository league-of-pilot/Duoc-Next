import { SESSION_TOKEN_EXPIRES_IN } from '@app/const/config.const'
import { PRISMA_ERR_CODE } from '@app/const/error.const'
import { prisma } from '@app/database'
import { EntityError } from '@app/types/error.class'
import { isPrismaClientKnownRequestError } from '@app/types/error.type'
import { comparePassword, hashPassword } from '@app/utils/crypto'
import { signSessionToken } from '@app/utils/jwt'
import { addMilliseconds } from '@app/utils/time.utils'

import { RegisterBodyType } from './register.schema'
import { LoginBodyType } from './login.schema'

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

// Stupid login
// Đúng ra ko thỏa bất cứ DK nào cũng throw ra hết
// for fast learning, chỉ copy, ko mod nhiều
export const loginService = async (body: LoginBodyType) => {
  const account = await prisma.account.findUnique({
    where: {
      email: body.email
    }
  })

  if (!account) {
    throw new EntityError([{ field: 'email', message: 'Email không tồn tại' }])
  }

  const isPasswordMatch = await comparePassword(body.password, account.password)
  if (!isPasswordMatch) {
    throw new EntityError([
      { field: 'password', message: 'Email hoặc mật khẩu không đúng' }
    ])
  }

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
}
