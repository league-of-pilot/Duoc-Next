import { hashPassword } from '@app/utils/crypto'
import { RegisterBodyType } from './register.schema'
import { prisma } from '@app/database'

export const registerController = async (body: RegisterBodyType) => {
  try {
    const hashedPassword = await hashPassword(body.password)
    const account = await prisma.account.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    })
  } catch (error: any) {
    console.log('error')
    throw error
  }
}
