'use client'
import { useAppContext } from '@/app/AppProvider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AddProductBtn() {
  // Vì logic Auth hoàn toàn nằm ở localStorage client
  // trên SSR xem như ko có thông tin cookie nữa

  // Dùng Auth context hay hơn
  // const [clientToken] = getClientLocalToken()

  const { user } = useAppContext()
  if (!user) return null

  return (
    <Link href={'/products/add'}>
      <Button variant={'secondary'}>Thêm sản phẩm</Button>
    </Link>
  )
}
