import { NAV_CONST, ROUTE_PATH } from '@/nextApp/route.const'
import Link from 'next/link'
import React from 'react'

export default function NavHeader() {
  return (
    <div>
      {NAV_CONST.map(el => (
        <li key={el.path}>
          <Link href={el.path}>{el.name}</Link>
        </li>
      ))}
    </div>
  )
}
