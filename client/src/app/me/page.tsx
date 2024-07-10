import { API_URL } from '@/nextApp/api.const'
import envConfig from '@/nextApp/config'
import { cookies } from 'next/headers'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}${API_URL.ACCOUNT.ME}`,
    {
      headers: {
        'Content-Type': 'application/json',
        // cookie mode false ở server
        Authorization: `Bearer ${sessionToken?.value}`
      }
    }
  )
    .then(async res => {
      const payload = await res.json()
      const data = {
        status: res.status,
        payload
      }
      if (!res.ok) {
        throw data
      }
      return data
    })
    .catch(err => {
      console.log('🚀 MeProfile err', err)
      return null
    })

  if (!result) return <h1>NO - AUTH - ME</h1>

  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {result?.payload?.data?.name}</div>
    </div>
  )
}
