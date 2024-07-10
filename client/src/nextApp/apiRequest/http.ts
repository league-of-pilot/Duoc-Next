import envConfig from '@/nextApp/config'
import {
  EntityError,
  EntityErrorPayload,
  HttpError
} from '@/nextApp/nextApp.type'
import { clientSessionToken } from './sessionToken'
import { LoginResType } from './auth.schema'
import { ENTITY_ERROR_STATUS } from '../api.const'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
}

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
    } else {
      throw new HttpError(data)
    }
  }

  // Cheat interceptor, tạm chấp nhận, tiện set cookie vào obj clientSessionToken
  if (['/auth/login', '/auth/register'].includes(url)) {
    clientSessionToken.value = (payload as LoginResType).data.token
  } else if ('/auth/logout'.includes(url)) {
    clientSessionToken.value = ''
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
