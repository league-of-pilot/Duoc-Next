import { CreateProductBodyType } from '@/module/productsAddForm/ProductsAddForm.schema'
import { API_URL } from '@/nextApp/api.const'
import { http } from '../http'
import { ProductListResType, ProductResType } from './product.schema'

const productApiRequest = {
  getList: () => http.get<ProductListResType>(API_URL.PRODUCTS),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>(API_URL.PRODUCTS, body),

  getDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),

  uploadImage: (body: FormData) =>
    http.post<{
      message: string
      data: string
    }>(API_URL.MEDIA_UPLOAD, body)
}

export default productApiRequest
