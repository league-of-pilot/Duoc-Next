import { TokenType } from '@app/const/token.const'

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType]

export interface TokenPayload {
  userId: number
  tokenType: TokenTypeValue
  exp: number
  iat: number
}
