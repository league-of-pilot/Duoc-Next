'use client'
import { Button } from '@/components/ui/button'
import { getLocalStorageToken } from '@/nextApp/apiRequest/sessionToken'
import { isClient } from '@/nextApp/nextApp.utils'
import Link from 'next/link'

export default function AddProductBtn() {
  // Vì logic Auth hoàn toàn nằm ở localStorage client
  // trên SSR xem như ko có thông tin cookie nữa
  const isAuthenticated = Boolean(getLocalStorageToken())
  if (!isAuthenticated) return null

  return (
    <Link href={'/products/add'}>
      <Button variant={'secondary'}>Thêm sản phẩm</Button>
    </Link>
  )
}
