import { http } from '@/nextApp/apiRequest/http'

import { AccountResType } from './account.schema'
import { API_URL } from '../api.const'

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>(API_URL.ACCOUNT.ME, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }),
  // for Testing only, thực chất chấp nhận api trên string optional,
  // header sai định dạng thì auto get token từ clientSessionToken
  meClient: () => http.get<AccountResType>(API_URL.ACCOUNT.ME)
}

export default accountApiRequest
