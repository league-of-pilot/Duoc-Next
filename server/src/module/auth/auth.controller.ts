import { hashPassword } from '@app/utils/crypto'
import { RegisterBodyType } from './register.schema'

export const registerController = async (body: RegisterBodyType) => {
  try {
    const hashedPassword = await hashPassword(body.password)
    console.log('🚀 ~ hashedPassword:', hashedPassword)
  } catch (error: any) {
    console.log('error')
    throw error
  }
}
