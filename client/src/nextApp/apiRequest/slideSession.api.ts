import { API_URL, NEXT_API } from '../api.const'
import { http } from './http'
import { SlideSessionResType } from './slideSession.schema'

export const slideSessionApi = {
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      API_URL.AUTH.SLIDE_SESSION,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`
        }
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(NEXT_API.SLIDE_SESSION, {}, { baseUrl: '' })
}
