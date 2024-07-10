'use client'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { isClient } from '@/nextApp/nextApp.utils'
import { useEffect, useLayoutEffect, useState } from 'react'

export default function AppProvider({
  children,
  inititalSessionToken = ''
}: {
  children: React.ReactNode
  inititalSessionToken?: string
}) {
  // Khá tệ, lyaout chạy set value nhưng button logout lại chạy trước, truy cập vào value trước khi được set
  useLayoutEffect(() => {
    if (isClient()) {
      clientSessionToken.value = inititalSessionToken
    }
  }, [inititalSessionToken])

  return children
}
