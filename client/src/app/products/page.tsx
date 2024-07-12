import { Button } from '@/components/ui/button'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import { ROUTE_PATH } from '@/nextApp/route.const'
import Image from 'next/image'
import Link from 'next/link'
import DeleteProduct from './_component/DeleteProduct'
import { cookies } from 'next/headers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Danh sách sản phẩm của Productic, được tạo bởi Được dev'
}

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList()
  const productList = payload.data

  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  const isAuthenticated = Boolean(sessionToken)

  // Đang bị dính cache, tạm skip

  return (
    <div>
      <h1>Product List</h1>

      {isAuthenticated && (
        <Link href={ROUTE_PATH.PRODUCTS_ADD}>
          <Button variant={'secondary'}>Thêm sản phẩm</Button>
        </Link>
      )}

      <div className='space-y-5'>
        {productList.map(product => (
          <div key={product.id} className='flex space-x-4'>
            <Link href={ROUTE_PATH.PRODUCT_DETAIL(product.id)}>
              <Image
                // url ngoài nên phải cấu hình Next config
                src={product.image}
                alt={product.name}
                // Set tạm value
                width={180}
                height={180}
                className='w-32 h-32 object-cover'
              />
            </Link>
            <h3>{product.name}</h3>
            <div>{product.price}</div>
            {isAuthenticated && (
              <div className='flex space-x-2 items-start'>
                <Link href={ROUTE_PATH.PRODUCT_EDIT(product.id)}>
                  <Button variant={'outline'}>Edit</Button>
                </Link>
                <DeleteProduct product={product} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
