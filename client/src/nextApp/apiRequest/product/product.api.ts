import { CreateProductBodyType } from '@/module/productsAddForm/ProductsAddForm.schema'
import { http } from '../http'
import { ProductResType } from './product.schema'
import { API_URL } from '@/nextApp/api.const'

const productApiRequest = {
  get: () => http.get(API_URL.PRODUCTS),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>(API_URL.PRODUCTS, body),

  uploadImage: (body: FormData) =>
    http.post<{
      message: string
      data: string
    }>(API_URL.MEDIA_UPLOAD, body)
}

export default productApiRequest
