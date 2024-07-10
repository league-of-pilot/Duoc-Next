import { ThemeProvider } from '@/components/ThemeProvider'
import { interFont } from '@/nextApp/font/next.font'
import { ROUTE_PATH } from '@/nextApp/route.const'
import Link from 'next/link'
import './globals.css'
import AppProvider from './AppProvider'
import { cookies } from 'next/headers'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  return (
    // https://github.com/shadcn/next-contentlayer/issues/7
    // https://ui.shadcn.com/docs/dark-mode/next
    // -> step 3 check ky4 trong docs sẽ thấy
    <html lang='en' suppressHydrationWarning>
      {/* <FontCdn /> */}
      {/* <body className={inter.className}>{children}</body> */}
      {/* Nếu Header đặt ngoài body sẽ lỗi hydrate ?? */}
      {/* https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required */}
      <body className={interFont.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Link href={ROUTE_PATH.ROOT}>Root Header</Link>
          <AppProvider inititalSessionToken={sessionToken?.value}>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
