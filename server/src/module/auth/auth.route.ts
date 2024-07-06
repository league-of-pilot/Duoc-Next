import { FastifyPluginAsync } from 'fastify'

import { RegisterBody, RegisterBodyType } from './register.schema'

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
      // reply.send({ hello: 'world' })
      return { hello: 'world' }
    }
  )
}
