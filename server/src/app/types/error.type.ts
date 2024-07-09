import { Prisma } from '@prisma/client'
import { FastifyError } from 'fastify'
import { ZodError } from 'zod'

export type ZodFastifyError = FastifyError & ZodError

export const isZodFastifyError = (error: any): error is ZodFastifyError => {
  if (error instanceof ZodError) {
    return true
  }
  return false
}

export function isPrismaClientKnownRequestError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError
}
