'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateProductBodyType,
  createProductSchema
} from './ProductsAddForm.schema'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'

const ProductAddForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProductBodyType>(createProductSchema)

  const deleteFile = () => {
    setFile(null)
    form.setValue('image', '')
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

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
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, error => {
          console.log(error)
          console.log(form.getValues('image'))
        })}
        className='space-y-2 max-w-[600px] flex-shrink-0 w-full'
        noValidate
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder='tên' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input placeholder='giá' type='number' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea placeholder='mô tả' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh</FormLabel>
              {/* TODO Add Form Hình ảnh input upload */}
              <FormControl>
                <Input
                  type='file'
                  accept='image/*'
                  // ref={field.ref}
                  // https://react-hook-form.com/docs/usecontroller/controller
                  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
                  ref={inputRef}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      // set file để render ra
                      setFile(file)
                      // set vào form url img, chỗ này xử lý ko hay
                      // real sẽ phải làm khác
                      // 1 phần do upload img là api riêng, sau đó chỉ hứng url về
                      // 1 phần do validate thống nhất với data, url này chỉ mang ý nghãi dummy pass qua zod
                      field.onChange('http://localhost:3000/' + file.name)
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {file && (
          <div>
            <Image
              src={URL.createObjectURL(file)}
              width={128}
              height={128}
              alt='preview'
              className='w-32 h-32 object-cover'
            />
            <Button
              type='button'
              variant={'destructive'}
              size={'sm'}
              // Vì chỉ upload 1 file duy nhất nên hàm gọi rỗng ko cần tham số
              onClick={deleteFile}
            >
              Xóa hình ảnh
            </Button>
          </div>
        )}

        <Button type='submit' className='!mt-8 w-full'>
          Thên sản phẩm
        </Button>
      </form>
    </Form>
  )
}

export default ProductAddForm