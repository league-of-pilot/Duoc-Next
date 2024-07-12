import ButtonLogout from '@/module/logout/button-logout'
import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { NAV_CONST } from '@/nextApp/route.const'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function NavHeader() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value
  let user = null
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken)
    user = data.payload.data
  }

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
