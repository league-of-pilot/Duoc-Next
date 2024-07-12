import { isClient } from '../nextApp.utils'

// ko sử dụng class này nữa vì sẽ qua localStorage
// để lại tham khảo, bản thân việc dùng class ko control được thứ tự component truy cập, ko force render lại được
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

// ===========================
// Local storage token
// ===========================

export const getLocalStorageToken = () => localStorage.getItem('sessionToken')

export const getClientLocalToken = () =>
  isClient()
    ? ([getLocalStorageToken(), true] as const)
    : ([null, false] as const)

export const getLocalTokenExpired = () => {
  const sessionTokenExpiresAt = localStorage.getItem('sessionTokenExpiresAt')
  const expiresAt = sessionTokenExpiresAt
    ? new Date(sessionTokenExpiresAt)
    : new Date()

  return [expiresAt, sessionTokenExpiresAt] as const
}

export const setLocalTokenExpired = (exp: string) =>
  localStorage.setItem('sessionTokenExpiresAt', exp)

// ko cần thiết
// class LocalStorageToken {
//   getToken() {
//     return localStorage.getItem('sessionToken')
//   }

//   setToken(token: string) {
//     localStorage.setItem('sessionToken', token)
//   }

//   getExpiresAt() {
//     return localStorage.getItem('sessionTokenExpiresAt')
//   }
//   setExpiresAt(expiresAt: string) {
//     localStorage.setItem('sessionTokenExpiresAt', expiresAt)
//   }
// }
