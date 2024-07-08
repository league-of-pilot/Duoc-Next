import { envConfig } from '@app/const/config.const'
import { SESSION_TOKEN_EXPIRES_IN } from '@app/const/global.const'
import { TokenType } from '@app/const/token.const'
import { TokenPayload } from '@app/types/jwt.types'
import { SignerOptions, createSigner, createVerifier } from 'fast-jwt'

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
