import { FAKE_IS_AUTH } from '@/nextApp/route.const'
import ButtonRedirect from '../components/ButtonRedirect'
import NavHeader from '../components/NavHeader'

export default function Home() {
  return (
    <main>
      <h1 className='text-4xl text-center font-thin font-sans'>
        Hello roboto font local [{FAKE_IS_AUTH ? 'user' : 'guest'}]
      </h1>
      <NavHeader />
      <ButtonRedirect />
    </main>
  )
}
