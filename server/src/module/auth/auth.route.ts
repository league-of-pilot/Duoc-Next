import { FastifyPluginAsync } from 'fastify'

import { RegisterBody, RegisterBodyType } from './register.schema'
import { registerService } from './auth.service'

// Ta5m
export const authRoutes: FastifyPluginAsync = async function routes(
  fastify,
  options
) {
  fastify.post<{
    Body: RegisterBodyType
  }>(
    '/register',
    {
      schema: {
        body: RegisterBody
      }
    },
    async (request, reply) => {
      const { body } = request
      await registerService(body)
      return { hello: 'world' }
    }
  )
}
