'use client'

import authApiRequest from '@/nextApp/apiRequest/auth.api'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sessionToken = searchParams.get('sessionToken')

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    // Phải check sessionToken Next sv và client có match ko
    if (sessionToken === clientSessionToken.value) {
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
