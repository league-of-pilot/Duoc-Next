import { z } from 'zod'
import { RegisterRes } from './auth.schema'

export const SlideSessionBody = z.object({}).strict()
export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>

export const SlideSessionRes = RegisterRes
export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>
