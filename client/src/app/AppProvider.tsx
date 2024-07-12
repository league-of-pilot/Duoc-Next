'use client'
import { AccountResType } from '@/nextApp/apiRequest/account.schema'
import { clientSessionToken } from '@/nextApp/apiRequest/sessionToken'
import { isClient } from '@/nextApp/nextApp.utils'
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'

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

export default function AppProvider({
  children,
  inititalSessionToken = '',
  user: userProp
}: {
  children: React.ReactNode
  inititalSessionToken?: string
  user: User | null
}) {
  const [user, setUser] = useState<User | null>(userProp)

  // Khá tệ, lyaout chạy set value nhưng button logout lại chạy trước, truy cập vào value trước khi được set
  useLayoutEffect(() => {
    if (isClient()) {
      clientSessionToken.value = inititalSessionToken
    }
  }, [inititalSessionToken])

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
