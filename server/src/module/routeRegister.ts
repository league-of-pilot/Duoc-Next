import { FastifyPluginAsync } from 'fastify'

import { accountRoutes } from './account/account.route'
import { authRoutes } from './auth/auth.route'

// Ta5m
export const routeRegister: FastifyPluginAsync = async function register(
  fastify,
  option
) {
  fastify.register(authRoutes, {
    prefix: '/auth'
  })

  fastify.register(accountRoutes, {
    prefix: '/account'
  })
}
