import { FAKE_IS_AUTH, ROUTE_PATH } from '@/nextApp/route.const'
import { redirect } from 'next/navigation'

// https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook

export default function ButtonRedirectServer() {
  if (!FAKE_IS_AUTH) {
    redirect('/login')
  }

  // https://stackoverflow.com/questions/74471642/nextjs-13-button-onclick-event-handlers-cannot-be-passed-to-client-componen
  const handleNavigate = () => {
    const routeRedirect = FAKE_IS_AUTH ? ROUTE_PATH.ROOT : ROUTE_PATH.LOGIN
    // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function
    console.log('🚀 ButtonRedirectServer L16-routeRedirect', routeRedirect)
  }
  const btnTxt = FAKE_IS_AUTH ? 'Hello useServer Root' : 'useServer Login'
  // return <button onClick={handleNavigate}>{btnTxt}</button>
  return <button>ButtonRedirectServer</button>
}
