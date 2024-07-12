'use client'

import { SLIDE_INTERVAL } from '@/nextApp/api.const'
import {
  clientSessionToken,
  getLocalTokenExpired,
  setLocalTokenExpired
} from '@/nextApp/apiRequest/sessionToken'
import { slideSessionApi } from '@/nextApp/apiRequest/slideSession.api'
import { diffNowHour } from '@/nextApp/time.utils'
import { useEffect } from 'react'

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        const [expiresAt] = getLocalTokenExpired()

        if (diffNowHour(expiresAt, SLIDE_INTERVAL)) {
          const res =
            await slideSessionApi.slideSessionFromNextClientToNextServer()
          // clientSessionToken.expiresAt = res.payload.data.expiresAt
          setLocalTokenExpired(res.payload.data.expiresAt)
        }
      },
      1000 * 60 * 30 // 30 minutes
    )
    return () => clearInterval(interval)
  }, [])
  return null
}
