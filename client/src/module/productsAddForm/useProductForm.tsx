import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateProductBodyType,
  createProductSchema
} from './ProductsAddForm.schema'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'

export const useProductForm = (file: File | null) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProductBodyType>(createProductSchema)

  async function onSubmit(values: CreateProductBodyType) {
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
}
