class SessionToken {
  private token = ''
  get value() {
    return this.token
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side')
    }
    this.token = token
  }
}

export const clientSessionToken = new SessionToken()
