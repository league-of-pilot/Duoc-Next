import z from 'zod'

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(), // Value tạm vì prj ko có refresh token
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string()
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>

export type PayloadJWT = {
  iat: number
  exp: number
  tokenType: string
  userId: number
}
