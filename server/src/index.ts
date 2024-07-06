import Fastify from 'fastify'

import { envConfig } from '@app/const/config.const'
import { API_URL } from '@app/const/global.const'

const fastify = Fastify({
  logger: true
})

const start = async () => {
  try {
    await fastify.listen({
      port: envConfig.PORT
    })
    console.log(`Server đang chạy: ${API_URL}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
