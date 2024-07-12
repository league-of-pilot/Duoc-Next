'use client'
import { Button } from '@/components/ui/button'
import { ProductListResType } from '@/nextApp/apiRequest/product/product.schema'
import { getLocalStorageToken } from '@/nextApp/apiRequest/sessionToken'
import { ROUTE_PATH } from '@/nextApp/route.const'
import Link from 'next/link'
import DeleteProduct from './DeleteProduct'

type TEditProductBtn = {
  product: ProductListResType['data'][0]
}
export default function EditProductBtn({ product }: TEditProductBtn) {
  // Vì logic Auth hoàn toàn nằm ở localStorage client
  // trên SSR xem như ko có thông tin cookie nữa
  const isAuthenticated = Boolean(getLocalStorageToken())
  if (!isAuthenticated) return null

  return (
    <div className='flex space-x-2 items-start'>
      <Link href={ROUTE_PATH.PRODUCT_EDIT(product.id)}>
        <Button variant={'outline'}>Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </div>
  )
}
