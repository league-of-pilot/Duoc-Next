import { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
// import { Roboto } from 'next/font/google'

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts
// const roboto = Roboto({
//   subsets: ['vietnamese'],
//   weight: ['100', '300', '400']
// })

// Font inter có variable -> check trên google font
// -> ko cần weight
export const interFont = Inter({ subsets: ['vietnamese'] })

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts
export const myFont = localFont({
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
