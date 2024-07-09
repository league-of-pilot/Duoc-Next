import { RegisterRes } from './../../../../server/src/module/auth/register.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// https://zod.dev/?id=type-inference
const defaultValues = {
  email: '',
  password: ''
}

export const loginObjectSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(3).max(100)
  })
  .strict()

export type TLoginSchema = z.infer<typeof loginObjectSchema>

export const loginFormSchema = {
  resolver: zodResolver(loginObjectSchema),
  defaultValues
}

export const LoginRes = RegisterRes
export type LoginResType = z.TypeOf<typeof LoginRes>
