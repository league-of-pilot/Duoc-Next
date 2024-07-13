import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import { ROUTE_PATH } from '@/nextApp/route.const'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AddProductBtn from './_component/AddProductBtn'
import EditProductBtn from './_component/EditProductBtn'

export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Danh sách sản phẩm của Productic, được tạo bởi Được dev'
}

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList()
  const productList = payload.data

  return (
    <div>
      <h1>Product List</h1>

      <AddProductBtn />

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
            <EditProductBtn product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
