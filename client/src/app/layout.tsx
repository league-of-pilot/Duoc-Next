import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import SlideSession from '@/module/slideSession/slideSession'
import { AccountResType } from '@/nextApp/apiRequest/account.schema'
import { interFont } from '@/nextApp/font/next.font'
import { ROUTE_PATH } from '@/nextApp/route.const'
import { Metadata } from 'next'
import Link from 'next/link'
import AppProvider from './AppProvider'
import './globals.css'
import { baseOpenGraph } from './shared-metadata'

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template
export const metadata: Metadata = {
  title: {
    template: '%s | Productic',
    default: 'Productic'
  },
  description: 'Được tạo bởi Được dev',
  openGraph: baseOpenGraph
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  let user: AccountResType['data'] | null = null

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
        <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Link href={ROUTE_PATH.ROOT}>Root Header</Link>
          <AppProvider user={user}>
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
