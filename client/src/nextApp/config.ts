import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string()
})

// dài dòng
// const configProject = configSchema.safeParse({
//   NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
// })

const configProject = configSchema.safeParse(process.env)
if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Invalid .env')
}

const envConfig = configProject.data
export default envConfig
