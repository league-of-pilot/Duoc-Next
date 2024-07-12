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
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useProductForm } from './useProductForm'
import { ProductResType } from '@/nextApp/apiRequest/product/product.schema'

type TProductAddForm = {
  product?: ProductResType['data']
}

const ProductAddForm = ({ product }: TProductAddForm) => {
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { form, onSubmit, loading } = useProductForm(file, product)
  const image = form.watch('image')

  const deleteFile = () => {
    setFile(null)
    form.setValue('image', '')
    if (inputRef.current) {
      inputRef.current.value = ''
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

        {(file || image) && (
          <div>
            <Image
              src={file ? URL.createObjectURL(file) : image}
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

        <Button type='submit' className='!mt-8 w-full' disabled={loading}>
          {product ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        </Button>
      </form>
    </Form>
  )
}

export default ProductAddForm
