import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const CreateProductBody = z.object({
  name: z.string().min(1).max(256),
  price: z.coerce.number().positive(),
  description: z.string().max(10000),
  image: z.string().url()
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

// Edit Product

export const UpdateProductBody = CreateProductBody
export type UpdateProductBodyType = CreateProductBodyType

export const createProductSchema = (product?: UpdateProductBodyType) => {
  const defaultValues = {
    name: product?.name ?? '',
    price: product?.price ?? 0,
    description: product?.description ?? '',
    image: product?.image ?? ''
  }

  return {
    resolver: zodResolver(CreateProductBody),
    defaultValues
  }
}
