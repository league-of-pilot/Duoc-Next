import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// https://zod.dev/?id=type-inference
const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const registerObjectSchema = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(3).max(100),
    confirmPassword: z.string().min(3).max(100)
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'Passwords do not match'
      })
    }
  })

export type TRegisterSchema = z.infer<typeof registerObjectSchema>

export const registerFormSchema = {
  resolver: zodResolver(registerObjectSchema),
  defaultValues
}
