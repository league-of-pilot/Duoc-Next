export default function LoginLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className='flex gap-4'>
        <h1>Register Layout</h1> &gt;&gt;
      </div>
      {children}
    </div>
  )
}