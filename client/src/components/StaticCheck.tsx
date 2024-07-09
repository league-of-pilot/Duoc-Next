import { STATIC_CHECK } from '@/nextApp/config'
import React from 'react'

export default function StaticCheck({ shouldShow = STATIC_CHECK }) {
  if (!shouldShow) return
  const rand = Math.floor(Math.random() * 100000) + 1
  return <div>{`StaticCheck ${rand}`}</div>
}
