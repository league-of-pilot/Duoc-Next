import ProfileForm from '@/module/ProfileForm/ProfileForm'
import accountApiRequest from '@/nextApp/apiRequest/account.api'
import { cookies } from 'next/headers'

export default async function ProfileEdit() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  // Vì dùng cookie nên api này không được cached trên server
  // KN quan trọng nhất của Next - CORE
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching

  const result = await accountApiRequest.me(sessionToken?.value ?? '')
  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}
