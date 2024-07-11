import envConfig from '@/nextApp/config'
import {
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@/nextApp/nextApp.type'
import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  NEXT_API
} from '../api.const'
import { isClient } from '../nextApp.utils'
import { LoginResType } from './auth.schema'
import { normalizePath } from './fetch.utils'
import { clientSessionToken } from './sessionToken'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

// ý tưởng như kiểu useRef, để track khi logout đang gọi, -> ko gọi thêm
let clientLogoutRequest: null | Promise<any> = null

// private request
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: clientSessionToken.value
      ? `Bearer ${clientSessionToken.value}`
      : ''
  }

  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body,
    method
  })

  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        }
      )
      // Vì http dùng chung cho cả client và server nên code phải xét ở cả 2 TH
      // Phức tạp cực kì, code rối thêm logic mà ko thật sự đạt performace cao
      // handle force logout ngay trong http giống như 1 kiểu interceptor
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient()) {
        // force logout ở client -> check comment trong api Next server client
        // copy dup code ở đây vì ko muốn circular, hơi dở
        clientLogoutRequest = fetch(NEXT_API.AUTH_LOGOUT, {
          method: 'POST',
          body: JSON.stringify({ force: true }),
          headers: {
            ...baseHeaders
          }
        })
        await clientLogoutRequest
        clientSessionToken.value = ''
        // reset flag
        clientLogoutRequest = null
        location.href = '/login'
      } else {
        // logout ở server
      }
    } else {
      // Chỗ này cần BE handle code chuẩn, hiện chỉ handle 422 zod
      throw new HttpError(data)
    }
  }

  // Cheat interceptor, tạm chấp nhận, tiện set cookie vào obj clientSessionToken
  // Vì utils này dùng ở cả server và client nên cần check DK
  if (isClient()) {
    if (
      ['auth/login', 'auth/register'].some(item => item === normalizePath(url))
    ) {
      clientSessionToken.value = (payload as LoginResType).data.token
    } else if ('auth/logout' === normalizePath(url)) {
      clientSessionToken.value = ''
    }
  }

  return data
}

export const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}
