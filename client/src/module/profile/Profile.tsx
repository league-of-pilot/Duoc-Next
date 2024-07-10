'use client'

import { useAppContext } from '@/app/AppProvider'
import { API_URL } from '@/nextApp/api.const'
import envConfig from '@/nextApp/config'
import { useEffect } from 'react'

export default function Profile() {
  const { sessionToken } = useAppContext()
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${API_URL.ACCOUNT.ME}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`
          }
        }
      ).then(async res => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })
      console.log(result)
    }
    fetchRequest()
  }, [sessionToken])
  return <div>useEffect - API - account/me</div>
}
