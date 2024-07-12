import envConfig from '@/nextApp/config'
import {
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@/nextApp/nextApp.type'
import { redirect } from 'next/navigation'
import {
  AUTHENTICATION_ERROR_STATUS,
  ENTITY_ERROR_STATUS,
  NEXT_API
} from '../api.const'
import { isClient } from '../nextApp.utils'
import { ROUTE_PATH } from '../route.const'
import { LoginResType } from './auth.schema'
import { normalizePath } from './fetch.utils'

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
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json'
        }

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken')
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`
    }
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
      // có 2 case thi api logout tuỳ thuộc nơi gọi mà sẽ hứng set-Cookie
      // Nếu từ sv gọi tiếp thì liệu có forward set-Cookie được không?
      if (isClient()) {
        // client gọi trực tiếp vào sv BE -> middleware gọi ngầm sv FE
        // force logout ở client -> check comment trong api Next server client
        // copy dup code ở đây vì ko muốn circular, hơi dở
        clientLogoutRequest = fetch(NEXT_API.AUTH_LOGOUT, {
          method: 'POST',
          body: JSON.stringify({ force: true }),
          headers: {
            ...baseHeaders
          }
        })
        try {
          await clientLogoutRequest
        } catch (error) {
          console.log('🚀 http L106-error', error)
        } finally {
          localStorage.removeItem('sessionToken')
          localStorage.removeItem('sessionTokenExpiresAt')

          // reset flag
          clientLogoutRequest = null
          location.href = ROUTE_PATH.LOGIN
        }
      } else {
        // logout ở server
        // sv FE gọi 1 api BE, bị trả 401 -> redirect về route logout
        // Nếu ko muốn trung gian phải forward set-Cookie về client
        // Hoặc redirect client về route logout ngầm, sau đó client lại thông qua useEffect gọi sv để xoá cookie -> lòng vòng
        // Vì route BE ko tự set-Cookie dùm
        const sessionToken = (options?.headers as any)?.Authorization.split(
          'Bearer '
        )[1]
        redirect(`/logout?sessionToken=${sessionToken}`)
        // Ý tưởng là ngay đây server next sẽ gọi báo BE logout, rồi trả Response header cho client luôn
        // Vì code này chạy 2 nợi nên truy cập vào Response được
        // return Response.json(
        //   {
        //     headers: {
        //       'Set-Cookie': `sessionToken=; Path=/; HttpOnly; Max-Age=0`
        //     }
        //   }
        // )
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
      const { token, expiresAt } = (payload as LoginResType).data
      localStorage.setItem('sessionToken', token)
      localStorage.setItem('sessionTokenExpiresAt', expiresAt)
    } else if ('auth/logout' === normalizePath(url)) {
      localStorage.removeItem('sessionToken')
      localStorage.removeItem('sessionTokenExpiresAt')
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
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options })
  }
}
