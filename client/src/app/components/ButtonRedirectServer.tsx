import { FAKE_IS_AUTH, ROUTE_PATH } from '@/nextApp/route.const'
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook

export default function ButtonRedirectServer() {
  if (!FAKE_IS_AUTH) {
    redirect('/login')
  }

  const handleNavigate = () => {
    const routeRedirect = FAKE_IS_AUTH ? ROUTE_PATH.ROOT : ROUTE_PATH.LOGIN
    redirect(routeRedirect)
  }
  const btnTxt = FAKE_IS_AUTH ? 'Hello useServer Root' : 'useServer Login'
  return <button onClick={handleNavigate}>{btnTxt}</button>
}
