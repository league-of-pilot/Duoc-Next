import { z } from 'zod'

// https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
// const configSchema = z.object({
//   NEXT_PUBLIC_API_ENDPOINT: z
//     .string()
//     .parse(process.env.NEXT_PUBLIC_API_ENDPOINT)
// })

// dài dòng
// const configProject = configSchema.safeParse({
//   NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
// })

// https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
// ko hoạt động dạng tắt như React thường được
// Docs có đề cập
// const configProject = configSchema.safeParse(process.env)
// if (!configProject.success) {
//   console.error(configProject.error.issues)
//   throw new Error('Invalid .env')
// }

// ko được code dynamic process.env[KEY]
// cách viết này khi error sẽ throw ngay lập tức, hơi xấu nhưng đỡ dup code
const envConfig = {
  NEXT_PUBLIC_API_ENDPOINT: z
    .string()
    .parse(process.env.NEXT_PUBLIC_API_ENDPOINT),
  NEXT_PUBLIC_URL: z.string().parse(process.env.NEXT_PUBLIC_URL)
}
export default envConfig

export const STATIC_CHECK = false
