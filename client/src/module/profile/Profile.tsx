'use client'

import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { useEffect } from 'react'

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(clientSessionToken.value)
      console.log('🚀 ~ fetchRequest ~ result:', result)
    }
    fetchRequest()
  }, [])
  return <div>useEffect - API - account/me</div>
}
