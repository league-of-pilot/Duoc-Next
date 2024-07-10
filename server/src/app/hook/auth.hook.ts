import { FastifyRequest } from 'fastify'

import { COOKIE_MODE } from '@app/const/config.const'
import { prisma } from '@app/database'
import { AuthError } from '@app/types/error.class'

export const getCookieUtils = (request: FastifyRequest) =>
  COOKIE_MODE
    ? request.cookies.sessionToken
    : request.headers.authorization?.split(' ')[1]
// https://fastify.dev/docs/latest/Reference/Hooks/
// async hook ko cần gọi done()

// https://github.com/fastify/fastify-auth?tab=readme-ov-file#onrequest-vs-prehandler-hook
// -> nơi nên đặt hook validate user tùy cách nhận data

export const requireLoginedHook = async (request: FastifyRequest) => {
  const sessionToken = getCookieUtils(request)
  console.log('🚀 ~ requireLoginedHook ~ sessionToken:', sessionToken)

  if (!sessionToken) throw new AuthError('Không nhận được session token')
  const session_row = await prisma.session.findUnique({
    where: {
      token: sessionToken as string
    },
    include: {
      account: true
    }
  })
  if (!session_row) throw new AuthError('Session Token không tồn tại')
  request.account = session_row.account
}
