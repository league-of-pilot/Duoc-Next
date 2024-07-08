// import fastifyPlugin from 'fastify-plugin'
import { fastifyPlugin } from 'fastify-plugin'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

// https://fastify.dev/docs/latest/Reference/Type-Providers/#zod
// https://github.com/turkerdev/fastify-type-provider-zod?tab=readme-ov-file#how-to-use

// Vì plugin này bọc bên dưới 1 plugin tổng hợp nên phải bọc fastify plugin 1 lần nữa
export const validatorCompilerPlugin = fastifyPlugin(
  (fastify, option, done) => {
    fastify.setValidatorCompiler(validatorCompiler)
    fastify.setSerializerCompiler(serializerCompiler)
    done()
  }
)
