import { envConfig } from '@app/const/config.const'
import { COOKIE_MODE } from '@app/const/global.const'
import { FastifyPluginAsync } from 'fastify'
import { registerService } from './auth.service'
import {
  RegisterBody,
  RegisterBodyType,
  RegisterRes,
  RegisterResType
} from './register.schema'

// Ta5m
export const authRoutes: FastifyPluginAsync = async function routes(
  fastify,
  options
) {
  fastify.post<{
    Body: RegisterBodyType
    Reply: RegisterResType
  }>(
    '/register',
    {
      schema: {
        body: RegisterBody,
        response: {
          '2xx': RegisterRes
        }
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
