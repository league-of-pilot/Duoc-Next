import { FastifyPluginAsync } from 'fastify'

import { requireLoginedHook } from '@app/hook/auth.hook'
import { AccountResType } from './account.schema'

export const accountRoutes: FastifyPluginAsync = async function (
  fastify,
  options
) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))

  fastify.get<{ Reply: AccountResType }>('/me', {}, async (request, reply) => {
    reply.send({
      data: request.account!,
      message: 'Lấy thông tin thành công'
    })
  })
}
