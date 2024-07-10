'use client'

import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'
import { useEffect } from 'react'

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const result = await accountApiRequest.meClient()
        console.log('🚀 ~ fetchRequest ~ result:', result)
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
    fetchRequest()
  }, [])
  return <div>useEffect - API - account/me</div>
}
