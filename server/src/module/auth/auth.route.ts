import { FastifyPluginAsync } from 'fastify'

// Ta5m
export const authRoutes: FastifyPluginAsync = async function routes(
  fastify,
  options
) {
  fastify.post('/register', {}, async (request, reply) => {
    // reply.send({ hello: 'world' })
    return { hello: 'world' }
  })
}
