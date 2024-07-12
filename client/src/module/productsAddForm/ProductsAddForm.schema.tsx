import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const CreateProductBody = z.object({
  name: z.string().min(1).max(256),
  price: z.coerce.number().positive(),
  description: z.string().max(10000),
  image: z.string().url()
})

export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>

export const createProductSchema = {
  resolver: zodResolver(CreateProductBody),
  defaultValues: {
    name: '',
    price: 0,
    description: '',
    image: ''
  }
}
