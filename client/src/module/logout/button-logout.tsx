'use client'

import { useAppContext } from '@/app/AppProvider'
import { Button } from '@/components/ui/button'
import authApiRequest from '@/nextApp/apiRequest/auth.api'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'
import { removeLocalStorageToken } from '@/nextApp/apiRequest/sessionToken'
import { usePathname, useRouter } from 'next/navigation'

export default function ButtonLogout() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useAppContext()

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      router.push('/login')
    } catch (error) {
      handleErrorApi({
        error
      })

      authApiRequest.logoutFromNextClientToNextServer(true).then(res => {
        router.push(`/login?redirectFrom=${pathname}`)
      })
    } finally {
      setUser(null)
      removeLocalStorageToken()
      router.refresh()
    }
  }
  // console.log('🚀 button-logout', clientSessionToken.value.slice(-5))
  // Bắt buộc phải quy về AppContext, nếu dùng localStorage thì build ở SSR sẽ fail
  // Hoặc phải check thêm isClient
  return !user ? (
    <h1>NoLogout</h1>
  ) : (
    <Button size={'sm'} onClick={handleLogout}>
      Đăng xuất
    </Button>
  )
}
