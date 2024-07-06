import cors from '@fastify/cors'
import { FastifyPluginCallback } from 'fastify'

// Ta5m

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

  done()
}
