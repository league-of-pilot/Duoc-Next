import { TLoginSchema } from '@/module/login/login.schema'
import { TRegisterSchema } from '@/module/register/register.schema'

import { API_URL, NEXT_API } from '../api.const'
import { LoginResType, RegisterResType } from './auth.schema'
import { http } from './http'

const authApiRequest = {
  login: (body: TLoginSchema) =>
    http.post<LoginResType>(API_URL.AUTH.LOGIN, body),

  register: (body: TRegisterSchema) =>
    http.post<RegisterResType>(API_URL.AUTH.REGISTER, body),

  auth: (body: { sessionToken: string }) =>
    http.post(NEXT_API.AUTH, body, {
      baseUrl: ''
    })
}

export default authApiRequest
