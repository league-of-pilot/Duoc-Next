'use client'

import { useAppContext } from '@/app/AppProvider'
import ButtonLogout from '@/module/logout/button-logout'
import { NAV_CONST } from '@/nextApp/route.const'
import Link from 'next/link'

export default function NavHeader() {
  // const cookieStore = cookies()
  // const sessionToken = cookieStore.get('sessionToken')?.value
  // let user = null
  // if (sessionToken) {
  //   const data = await accountApiRequest.me(sessionToken)
  //   user = data.payload.data
  // }

  const { user } = useAppContext()

  return (
    <div>
      {NAV_CONST.map(el => (
        <li key={el.path}>
          <Link href={el.path}>{el.name}</Link>
        </li>
      ))}
      {!!user && (
        <div>
          Xin chào <strong>{user.name}</strong>
        </div>
      )}
      <ButtonLogout />
    </div>
  )
}
