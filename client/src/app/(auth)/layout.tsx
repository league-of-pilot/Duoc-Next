import { ROUTE_PATH } from '@/nextApp/route.const'
import Link from 'next/link'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className='flex gap-1'>
        <h1>Auth Layout</h1>
        {'>'}
        <div>
          <Link href={ROUTE_PATH.ROOT}>Back to Home</Link>
        </div>
      </div>
      {children}
    </div>
  )
}
