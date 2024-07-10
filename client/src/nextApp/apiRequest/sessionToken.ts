import { isClient } from '../nextApp.utils'

class SessionToken {
  private token = ''
  get value() {
    return this.token
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (!isClient()) {
      throw new Error('Cannot set token on server side')
    }
    console.log('🚀 sessionToken set', token.slice(-5))
    this.token = token
  }
}

export const clientSessionToken = new SessionToken()
