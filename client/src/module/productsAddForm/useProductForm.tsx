import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateProductBodyType,
  UpdateProductBodyType,
  createProductSchema
} from './ProductsAddForm.schema'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'
import { ProductResType } from '@/nextApp/apiRequest/product/product.schema'

export const useProductForm = (
  file: File | null,
  product?: ProductResType['data']
) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProductBodyType>(createProductSchema(product))

  const createProduct = async (values: CreateProductBodyType) => {
    if (loading) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file as Blob)

      // Logic BE đang xử lý riêng, up file trước, sau đó trả về url,
      // FE lấy url này gọi tạo file -> ko hay
      // 2 step tạo form rất dở

      const uploadImageResult = await productApiRequest.uploadImage(formData)
      const imageUrl = uploadImageResult.payload.data

      const result = await productApiRequest.create({
        ...values,
        image: imageUrl
      })

      toast({
        description: result.payload.message
      })
      router.push('/products')
      // Buộc hard refresh để tránh cache
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) return
    setLoading(true)
    let values = _values
    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file as Blob)
        const uploadImageResult = await productApiRequest.uploadImage(formData)
        const imageUrl = uploadImageResult.payload.data
        values = {
          ...values,
          image: imageUrl
        }
      }

      const result = await productApiRequest.update(product.id, values)

      toast({
        description: result.payload.message
      })
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return
    if (product) {
      await updateProduct(values)
    } else {
      await createProduct(values)
    }
  }

  return {
    form,
    onSubmit,
    loading
  }
}
