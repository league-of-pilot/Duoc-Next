import 'dotenv/config'
import fs from 'fs'
import path from 'path'

import { FastifyCookieOptions } from '@fastify/cookie'
import { config } from 'dotenv'
import { z } from 'zod'

// interface EnvConfig extends NodeJS.ProcessEnv {
// cách xài extend ko hoạt động với PORT : number
// NodeJS.ProcessEnv is defined with a string index signature ([key: string]: string | undefined

// typeof process.env.PORT check vẫn là string
// mẹo force type chứ ko có tác dụng validate
// có thể dùng thư viện envalid
// tuy nhiên dùng zod sẽ type safe, có built in infer type sẵn

const mode = process.env.NODE_ENV ?? 'development'
export const isDev = !mode || mode === 'dev' || mode === 'development'
export const isProd = mode === 'prod' || mode === 'production'

const envFilename = `.env${isDev ? '' : `.${mode}`}`

config({
  path: envFilename
})

const envConfigSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DOMAIN: z.string(),
  PROTOCOL: z.string(),
  DATABASE_URL: z.string(),
  SESSION_TOKEN_SECRET: z.string(),
  SESSION_TOKEN_EXPIRES_IN_HOUR: z.coerce.number()
})

type EnvConfig = z.infer<typeof envConfigSchema>

const validateEnvConfig = (config = process.env): EnvConfig => {
  if (!fs.existsSync(path.resolve(envFilename))) {
    console.log('NO ENV FILE FOUND!, EXITING...')
    process.exit(1)
  }

  const parsedConfig = envConfigSchema.parse(config) // This throws an error if validation fails
  return parsedConfig
}

export const envConfig = validateEnvConfig()

// =================================================================
// Other config not in .env but can be hard-cord for simplify
// =================================================================

export const fastifyCookieOptionsOptional = {
  secret: 'my-secret', // for cookies signature
  parseOptions: {} // options for parsing cookies
} as FastifyCookieOptions

export const COOKIE_MODE = true

export const SESSION_TOKEN_EXPIRES_IN =
  envConfig.SESSION_TOKEN_EXPIRES_IN_HOUR * 60 * 60 * 1000

export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`
