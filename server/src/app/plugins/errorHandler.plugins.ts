// https://fastify.dev/docs/latest/Reference/Errors/
// Thử viết dạng async - for learning

import { FastifyError, FastifyPluginAsync } from 'fastify'

import { ERR_CODE } from '@app/const/error.const'

import { ZodFastifyError, isZodFastifyError } from './error.type'

// fastify plugin ở tầng merge - for learning
export const errorHandlerPlugin: FastifyPluginAsync = async fastify => {
  // Register parent error handler
  fastify.setErrorHandler(
    (error: FastifyError | ZodFastifyError, request, reply) => {
      if (isZodFastifyError(error)) {
        const { issues, validationContext } = error
        const errors = issues.map(issue => ({
          ...issue,
          field: issue.path.join('.')
        }))

        return reply.status(ERR_CODE.ZOD).send({
          // validationContext will be 'body' or 'params' or 'headers' or 'query'
          message: `A validation error occurred when validating the ${validationContext}...`,
          errors,
          code: error.code,
          statusCode: ERR_CODE.ZOD
        })
      }

      // Unhandled errors
      console.error('Unhandled errors', error)
      const statusCode = (error as any).statusCode || ERR_CODE.UNHANDLED
      return reply.status(statusCode).send({
        message: error.message,
        error,
        statusCode
      })
    }
  )
}
