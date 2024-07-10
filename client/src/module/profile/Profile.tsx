'use client'

import { useAppContext } from '@/app/AppProvider'
import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { useEffect } from 'react'

export default function Profile() {
  const { sessionToken } = useAppContext()
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(sessionToken)
      console.log(result)
    }
    fetchRequest()
  }, [sessionToken])
  return <div>useEffect - API - account/me</div>
}
