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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  CreateProductBodyType,
  createProductSchema
} from './ProductsAddForm.schema'
import { Textarea } from '@/components/ui/textarea'

const ProductAddForm = () => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<CreateProductBodyType>(createProductSchema)

  async function onSubmit(values: CreateProductBodyType) {
    if (loading) return
    setLoading(true)
    try {
      // TODO try submit here
      toast({
        description: 'payload.message'
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO Display hình ảnh đang chọn */}

        <Button type='submit' className='!mt-8 w-full'>
          Thên sản phẩm
        </Button>
      </form>
    </Form>
  )
}

export default ProductAddForm
