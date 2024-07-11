import { toast } from '@/components/ui/use-toast'
import envConfig from '@/nextApp/config'
import { UseFormSetError } from 'react-hook-form'
import { EntityError } from '../nextApp.type'

//   const result = await fetch(
//     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
//     {
//       body: JSON.stringify(values),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     }
//   ).then((res) => res.json())
// }
class NativeFetch {
  constructor(
    public header = {
      'Content-Type': 'application/json'
    },
    public URL = envConfig.NEXT_PUBLIC_API_ENDPOINT
  ) {}

  rawPost<V, T>(url: string, payload: T) {
    return fetch(`${this.URL}${url}`, {
      body: JSON.stringify(payload),
      headers: this.header,
      method: 'POST'
    })
  }

  post<V, T>(url: string, payload: T) {
    return this.rawPost(url, payload).then(res => res.json() as V)
  }

  // Vấn đề logic gọi
  advPost<V, T = unknown>(url: string, payload: T) {
    return this.rawPost(url, payload).then(async res => {
      const resJson = (await res.json()) as V
      return [resJson, res] as const
    })
  }
}

export const nativeFetch = new NativeFetch()

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach(item => {
      setError(item.field, {
        type: 'server',
        message: item.message
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.message ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}

/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

// Thư viện jwt xem như ko xài nữa vì exp giờ client tự tính và sẽ dùng api riêng để update (sliding session)
// export const decodeJWT = <Payload = any>(token: string) => {
//   return jwt.decode(token) as Payload
// }
