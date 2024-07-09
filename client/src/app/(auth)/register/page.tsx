import StaticCheck from '@/components/StaticCheck'
import { ModeToggle } from '@/components/ThemeToggle'
import { RegisterForm } from '@/module/register/RegisterForm'

// Tên page ko quan trọng
export default function Register() {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-center relative'>
        <h1 className='self-center'>Register Page</h1>
        <StaticCheck />
        <div className='absolute left-10'>
          <ModeToggle />
        </div>
      </div>
      <div className='flex w-full justify-center'>
        <div className='max-w-[600px] w-full'>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
