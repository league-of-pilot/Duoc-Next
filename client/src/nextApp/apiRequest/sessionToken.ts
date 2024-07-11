import { isClient } from '../nextApp.utils'

class SessionToken {
  private token = ''
  private _expiresAt = new Date().toISOString()

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

  get expiresAt() {
    return this._expiresAt
  }
  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }
    this._expiresAt = expiresAt
  }
}

export const clientSessionToken = new SessionToken()
