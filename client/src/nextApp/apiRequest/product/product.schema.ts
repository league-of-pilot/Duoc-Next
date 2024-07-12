import z from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const ProductRes = z.object({
  data: ProductSchema,
  message: z.string()
})

export type ProductResType = z.TypeOf<typeof ProductRes>
