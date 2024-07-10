import Profile from '@/module/profile/Profile'
import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { cookies } from 'next/headers'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  if (!result) return <h1>NO - AUTH - ME</h1>

  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {result?.payload?.data?.name}</div>
      <Profile />
    </div>
  )
}
