import type { Metadata } from 'next'
// import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Link from 'next/link'
import { ROUTE_PATH } from '@/nextApp/route.const'

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts
// const roboto = Roboto({
//   subsets: ['vietnamese'],
//   weight: ['100', '300', '400']
// })

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
const myFont = localFont({
  src: [
    {
      path: './Roboto-Thin.ttf',
      weight: '100'
    },
    {
      path: './Roboto-Regular.ttf',
      weight: '400'
    }
  ],
  display: 'swap',
  variable: '--font-roboto-local'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      {/* <FontCdn /> */}
      {/* <body className={inter.className}>{children}</body> */}
      {/* Nếu Header đặt ngoài body sẽ lỗi hydrate ?? */}
      {/* https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required */}
      <body className={myFont.variable}>
        <Link href={ROUTE_PATH.ROOT}>Root Header</Link>
        {children}
      </body>
    </html>
  )
}

// const FontCdn = () => (
//   <>
//     <link rel='preconnect' href='https://fonts.googleapis.com' />
//     <link rel='preconnect' href='https://fonts.gstatic.com' />
//     <link
//       href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
//       rel='stylesheet'
//     ></link>
//   </>
// )
