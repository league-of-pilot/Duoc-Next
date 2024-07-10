'use client'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { useLayoutEffect } from 'react'

export default function AppProvider({
  children,
  inititalSessionToken = ''
}: {
  children: React.ReactNode
  inititalSessionToken?: string
}) {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = inititalSessionToken
    }
  }, [inititalSessionToken])

  return children
}
