import ButtonLogout from '@/module/logout/button-logout'
import { NAV_CONST } from '@/nextApp/route.const'
import Link from 'next/link'

export default function NavHeader() {
  return (
    <div>
      {NAV_CONST.map(el => (
        <li key={el.path}>
          <Link href={el.path}>{el.name}</Link>
        </li>
      ))}
      <ButtonLogout />
    </div>
  )
}
