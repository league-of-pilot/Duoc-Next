'use client'

import authApiRequest from '@/nextApp/apiRequest/auth.api'
import { getLocalStorageToken } from '@/nextApp/apiRequest/sessionToken'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function LogoutLogic() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // Phải check sessionToken Next sv và client có match ko
    if (sessionToken === getLocalStorageToken()) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then(_ => {
        router.push(`/login?redirectFrom=${pathname}`)
      })
    }
    return () => {
      controller.abort()
    }
  }, [sessionToken, router, pathname])
  return <div>page</div>
}

// build sẽ báo error
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  )
}
