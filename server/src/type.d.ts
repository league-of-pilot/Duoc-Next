import { type FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    account?: Account
    cookies: {
      sessionToken?: string
    }
  }
}
