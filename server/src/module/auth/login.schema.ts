import z from 'zod'
import { RegisterRes } from './register.schema'

// For Login
// Đúng ra dup code được vì thực chất là 2 entities khác nhau, tuy nhiên đang cố gắng tận dụng code
export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
