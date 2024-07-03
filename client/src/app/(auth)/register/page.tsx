import { ModeToggle } from '@/components/ThemeToggle'
import { RegisterForm } from '@/module/register/RegisterForm'

// Tên page ko quan trọng
export default function Register() {
  return (
    <div>
      <div className='flex justify-center relative'>
        <h1 className='self-center'>Register Page</h1>
        <div className='absolute left-10'>
          <ModeToggle />
        </div>
      </div>
      <div className='flex justify-center'>
        <RegisterForm />
      </div>
    </div>
  )
}
