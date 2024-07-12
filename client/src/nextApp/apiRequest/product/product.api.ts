import {
  CreateProductBodyType,
  UpdateProductBodyType
} from '@/module/productsAddForm/ProductsAddForm.schema'
import { API_URL } from '@/nextApp/api.const'
import { http } from '../http'
import { ProductListResType, ProductResType } from './product.schema'
import { MessageResType } from '../common.schema'

const productApiRequest = {
  // soft navigate back về vẫn đang dính cache
  getList: () =>
    http.get<ProductListResType>(API_URL.PRODUCTS, {
      cache: 'no-store'
    }),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>(API_URL.PRODUCTS, body),

  getDetail: (id: number) =>
    http.get<ProductResType>(API_URL.PRODUCT_ID(id), {
      cache: 'no-store'
    }),

  update: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(API_URL.PRODUCT_ID(id), body),

  uploadImage: (body: FormData) =>
    http.post<{
      message: string
      data: string
    }>(API_URL.MEDIA_UPLOAD, body),

  delete: (id: number) => http.delete<MessageResType>(API_URL.PRODUCT_ID(id))
}

export default productApiRequest
