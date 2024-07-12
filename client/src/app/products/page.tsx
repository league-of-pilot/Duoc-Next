import { Button } from '@/components/ui/button'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import { ROUTE_PATH } from '@/nextApp/route.const'
import Image from 'next/image'
import Link from 'next/link'
import DeleteProduct from './_component/DeleteProduct'

export default async function ProductListPage() {
  const { payload } = await productApiRequest.getList()
  const productList = payload.data

  // Đang bị dính cache, tạm skip

  return (
    <div>
      <h1>Product List</h1>

      <Link href={ROUTE_PATH.PRODUCTS_ADD}>
        <Button variant={'secondary'}>Thêm sản phẩm</Button>
      </Link>

      <div className='space-y-5'>
        {productList.map(product => (
          <div key={product.id} className='flex space-x-4'>
            <Image
              // url ngoài nên phải cấu hình Next config
              src={product.image}
              alt={product.name}
              // Set tạm value
              width={180}
              height={180}
              className='w-32 h-32 object-cover'
            />
            <h3>{product.name}</h3>
            <div>{product.price}</div>
            <div className='flex space-x-2 items-start'>
              <Link href={ROUTE_PATH.PRODUCT_EDIT(product.id.toString())}>
                <Button variant={'outline'}>Edit</Button>
              </Link>
              <DeleteProduct product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
