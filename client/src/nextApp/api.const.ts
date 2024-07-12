export const API_URL = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SLIDE_SESSION: '/auth/slide-session'
  },
  ACCOUNT: {
    ME: '/account/me'
  },
  PRODUCTS: '/products',
  PRODUCT_ID: (id: number | string) => `/products/${id}`,
  MEDIA_UPLOAD: '/media/upload'
}

export const NEXT_API = {
  AUTH: '/api/auth',
  AUTH_LOGOUT: '/api/auth/logout',
  SLIDE_SESSION: '/api/auth/slide-session'
}

export const ENTITY_ERROR_STATUS = 422
export const AUTHENTICATION_ERROR_STATUS = 401

export const SLIDE_INTERVAL = 1 //hour
