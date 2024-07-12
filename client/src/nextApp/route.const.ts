export const ROUTE_PATH = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ME: '/me',
  PROFILE_EDIT: '/edit-profile',
  PRODUCTS_ADD: '/products/add',
  DEMO_IMG: '/demoImg'
} as const

export const NAV_CONST = [
  { path: ROUTE_PATH.ROOT, name: '/' },
  { path: ROUTE_PATH.LOGIN, name: 'Login' },
  { path: ROUTE_PATH.REGISTER, name: 'Register' },
  { path: ROUTE_PATH.ME, name: 'my profile' },
  { path: ROUTE_PATH.PROFILE_EDIT, name: 'edit profile' },
  { path: ROUTE_PATH.PRODUCTS_ADD, name: 'add product' },
  { path: ROUTE_PATH.DEMO_IMG, name: 'Demo Img' }
]

export const FAKE_IS_AUTH = true
