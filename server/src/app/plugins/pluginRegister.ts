import cors from '@fastify/cors'
import { FastifyPluginCallback } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import { errorHandlerPlugin } from './errorHandler.plugins'
import { validatorCompilerPlugin } from './validatorCompiler.plugins'
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'

// Async callback ko sao
export const pluginRegister: FastifyPluginCallback = function (
  fastify,
  option,
  done
) {
  // https://github.com/fastify/fastify-cors?tab=readme-ov-file#options
  fastify.register(cors, {
    origin: ['*'], // Cho phép tất cả các domain gọi API
    credentials: true // Cho phép trình duyệt gửi cookie đến server
  })

  // fastify-plugin chỉ có tác dụng trong 1 cấp
  fastify.register(validatorCompilerPlugin)
  fastify.register(fastifyPlugin(errorHandlerPlugin))
  fastify.register(cookie, {
    secret: 'my-secret', // for cookies signature
    parseOptions: {} // options for parsing cookies
  } as FastifyCookieOptions)

  done()
}
