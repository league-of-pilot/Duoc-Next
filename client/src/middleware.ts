import { NextRequest, NextResponse } from 'next/server'

const privatePaths = ['/me']
const authPaths = ['/login', '/register']

// https://nextjs.org/docs/app/api-reference/file-conventions/middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🚀 middleware L11-pathname', pathname)
  const sessionToken = request.cookies.get('sessionToken')?.value
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some(path => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some(path => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // next ko hiểu logic gom array mà phải thông qua regex hoặc viết tường minh ra
  //   https://nextjs.org/docs/messages/invalid-page-config
  //   matcher: [...privatePaths, ...authPaths]
  matcher: ['/login', '/register', '/me']
}
