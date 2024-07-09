import { SignerOptions, createSigner, createVerifier } from 'fast-jwt'

import { SESSION_TOKEN_EXPIRES_IN, envConfig } from '@app/const/config.const'
import { TokenType } from '@app/const/token.const'
import { TokenPayload } from '@app/types/jwt.type'

export const signSessionToken = (
  payload: Pick<TokenPayload, 'userId'>,
  options?: SignerOptions
) => {
  const signSync = createSigner({
    key: envConfig.SESSION_TOKEN_SECRET,
    algorithm: 'HS256',
    expiresIn: SESSION_TOKEN_EXPIRES_IN,
    ...options
  })
  return signSync({ ...payload, tokenType: TokenType.SessionToken })
}

export const verifySessionToken = (token: string) => {
  const verifySync = createVerifier({
    key: envConfig.SESSION_TOKEN_SECRET
  })
  return verifySync(token) as TokenPayload
}
