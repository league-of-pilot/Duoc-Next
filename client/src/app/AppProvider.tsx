'use client'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { isClient } from '@/nextApp/nextApp.utils'
import { useLayoutEffect } from 'react'

export default function AppProvider({
  children,
  inititalSessionToken = ''
}: {
  children: React.ReactNode
  inititalSessionToken?: string
}) {
  useLayoutEffect(() => {
    if (isClient()) {
      clientSessionToken.value = inititalSessionToken
    }
  }, [inititalSessionToken])

  return children
}
