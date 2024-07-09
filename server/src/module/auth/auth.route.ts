import { FastifyPluginAsync } from 'fastify'
import { RegisterBody, RegisterBodyType } from './register.schema'
import { registerService } from './auth.service'
import { envConfig } from '@app/const/config.const'
import { COOKIE_MODE } from '@app/const/global.const'

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
      const { account, session } = await registerService(body)
      const res = {
        message: 'Đăng ký thành công',
        data: {
          token: session.token,
          expiresAt: session.expiresAt.toISOString(),
          account
        }
      }

      if (COOKIE_MODE) {
        reply
          .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: session.expiresAt,
            sameSite: 'none',
            domain: envConfig.DOMAIN
          })
          .send(res)
      } else {
        reply.send(res)
      }
    }
  )
}
