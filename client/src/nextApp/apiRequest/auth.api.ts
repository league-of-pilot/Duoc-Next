import { TLoginSchema } from '@/module/login/login.schema'
import { TRegisterSchema } from '@/module/register/register.schema'

import { API_URL, NEXT_API } from '../api.const'
import { LoginResType, RegisterResType } from './auth.schema'
import { http } from './http'
import { MessageResType } from './common.schema'

const authApiRequest = {
  login: (body: TLoginSchema) =>
    http.post<LoginResType>(API_URL.AUTH.LOGIN, body),

  register: (body: TRegisterSchema) =>
    http.post<RegisterResType>(API_URL.AUTH.REGISTER, body),

  auth: (body: { sessionToken: string }) =>
    http.post(NEXT_API.AUTH, body, {
      baseUrl: ''
    }),

  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      API_URL.AUTH.LOGOUT,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),

  logoutFromNextClientToNextServer: () =>
    http.post<MessageResType>(
      NEXT_API.AUTH_LOGOUT,
      {},
      {
        baseUrl: ''
      }
    )
}

export default authApiRequest
