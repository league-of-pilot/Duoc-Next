import { CreateProductBodyType } from '@/module/productsAddForm/ProductsAddForm.schema'
import { API_URL } from '@/nextApp/api.const'
import { http } from '../http'
import { ProductListResType, ProductResType } from './product.schema'

const productApiRequest = {
  // soft navigate back về vẫn đang dính cache
  getList: () =>
    http.get<ProductListResType>(API_URL.PRODUCTS, {
      cache: 'no-store'
    }),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>(API_URL.PRODUCTS, body),

  getDetail: (id: number) =>
    http.get<ProductResType>(`/products/${id}`, {
      cache: 'no-store'
    }),

  uploadImage: (body: FormData) =>
    http.post<{
      message: string
      data: string
    }>(API_URL.MEDIA_UPLOAD, body)
}

export default productApiRequest
