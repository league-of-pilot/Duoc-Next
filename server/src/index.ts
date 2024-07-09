import Fastify from 'fastify'
import fp from 'fastify-plugin'

import { API_URL, envConfig } from '@app/const/config.const'
import { pluginRegister } from '@app/plugins/pluginRegister'

import { routeRegister } from '@module/routeRegister'

const fastify = Fastify({
  logger: true
})

// fastify.register(pluginRegister)

// https://fastify.dev/docs/latest/Guides/Getting-Started/#your-first-server
const start = async () => {
  try {
    // https://fastify.dev/docs/latest/Guides/Plugins-Guide/#how-to-handle-encapsulation-and-distribution
    // Nếu viết trực tiếp ra thì ok
    fastify.register(fp(pluginRegister))
    fastify.register(routeRegister)

    await fastify.listen({
      port: envConfig.PORT
    })
    console.log('🚀 ~ API_URL:', API_URL)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
