declare module 'fastify' {
  interface FastifyRequest {
    account?: Account
    cookies: {
      sessionToken?: string
    }
  }
}
