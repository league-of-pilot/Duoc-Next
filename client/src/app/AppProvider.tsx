'use client'
import { AccountResType } from '@/nextApp/apiRequest/account.schema'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
// import dynamic from 'next/dynamic'
// const Header = dynamic(() => import('@/components/header'), { ssr: false })
// -> chấp nhận hiện tượng false useEffect / hydrate reconcile
type User = AccountResType['data']
type TAppContext = {
  user: User | null
  setUser: (user: User | null) => void
}

// Create the context
const AppContext = createContext<TAppContext>({
  user: null,
  setUser: () => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

type TAppProvider = {
  children: React.ReactNode
  // user: User | null
  // inititalSessionToken?: string
}

export default function AppProvider({
  children
  // user: userProp
}: TAppProvider) {
  const [user, setUserState] = useState<User | null>(() => {
    // if (isClient()) {
    //   const _user = localStorage.getItem('user')
    //   return _user ? JSON.parse(_user) : null
    // }

    // return null
    // state init ờ sv và ở client khác nhau -> WARNING

    // Viết như trên sẽ gây lỗi hydrate do init ở sv và client khác nhau
    // phải kết hợp dynamic hoặc ít nhất biến header user -> client component
    // Hiện thấy kiêu gì cũng bị flash

    // https://nextjs.org/docs/messages/react-hydration-error

    return null
  })

  // Cách nếu dùng return null ở useState
  // Gây flash ở Btn Logout
  useEffect(() => {
    const _user = localStorage.getItem('user')
    setUserState(_user ? JSON.parse(_user) : null)
  }, [setUserState])

  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    [setUserState]
  )
  console.count('⚽️ AppProvider L33 render')

  // Khá tệ, lyaout chạy set value nhưng button logout lại chạy trước, truy cập vào value trước khi được set
  // useLayoutEffect(() => {
  //   if (isClient()) {
  //     clientSessionToken.value = inititalSessionToken
  //   }
  // }, [inititalSessionToken])

  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
