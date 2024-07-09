import { envConfig } from '@app/const/config.const'

export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`

export const SESSION_TOKEN_EXPIRES_IN =
  envConfig.SESSION_TOKEN_EXPIRES_IN_HOUR * 60 * 60 * 1000

export const COOKIE_MODE = true
