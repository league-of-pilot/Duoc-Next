'use client'
import { FAKE_IS_AUTH, ROUTE_PATH } from '@/nextApp/route.const'
import { useRouter } from 'next/navigation'

// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook

export default function ButtonRedirect() {
  const router = useRouter()
  const handleNavigate = () => {
    const routeRedirect = FAKE_IS_AUTH ? ROUTE_PATH.ROOT : ROUTE_PATH.LOGIN
    router.push(routeRedirect)
    // redirect('/login')
  }
  const btnTxt = FAKE_IS_AUTH ? 'Hello useClient Root' : 'useClient Login'
  return <button onClick={handleNavigate}>{btnTxt}</button>
}
