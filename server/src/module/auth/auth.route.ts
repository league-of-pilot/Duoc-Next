import { FastifyPluginAsync } from 'fastify'

import { envConfig, COOKIE_MODE } from '@app/const/config.const'

import { loginService, logoutService, registerService } from './auth.service'
import {
  RegisterBody,
  RegisterBodyType,
  RegisterRes,
  RegisterResType
} from './register.schema'
import { LoginBody, LoginRes } from './login.schema'
import { MessageRes, MessageResType } from '@app/types/common.type'
import { getCookieUtils, requireLoginedHook } from '@app/hook/auth.hook'

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

  fastify.post(
    '/login',
    {
      schema: {
        response: {
          200: LoginRes
        },
        body: LoginBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { session, account } = await loginService(body)
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
          .send({
            message: 'Đăng nhập thành công',
            data: {
              token: session.token,
              expiresAt: session.expiresAt.toISOString(),
              account
            }
          })
      } else {
        reply.send({
          message: 'Đăng nhập thành công',
          data: {
            token: session.token,
            expiresAt: session.expiresAt.toISOString(),
            account
          }
        })
      }
    }
  )

  fastify.post<{ Reply: MessageResType }>(
    '/logout',
    {
      schema: {
        response: {
          200: MessageRes
        }
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      // Chỗ này có thể gán luôn token vào trong request khi đi qua hook
      // tạm code skip
      const sessionToken = getCookieUtils(request)
      const message = await logoutService(sessionToken as string)

      if (COOKIE_MODE) {
        reply
          .clearCookie('sessionToken', {
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            secure: true
          })
          .send({
            message
          })
      } else {
        reply.send({
          message
        })
      }
    }
  )
}
