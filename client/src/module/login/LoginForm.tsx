'use client'

import { useAppContext } from '@/app/AppProvider'
import StaticCheck from '@/components/StaticCheck'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import authApiRequest from '@/nextApp/apiRequest/auth.api'
import { handleErrorApi } from '@/nextApp/apiRequest/fetch.utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TLoginSchema, loginFormSchema } from './login.schema'

const FormMap: {
  key: keyof TLoginSchema
  label: string
  component: (props: InputProps) => JSX.Element
}[] = [
  {
    key: 'email',
    label: 'Email',
    component: (props: InputProps) => (
      <Input type='email' placeholder='Enter your email' {...props} />
    )
  },
  {
    key: 'password',
    label: 'Password',
    component: (props: InputProps) => (
      <Input type='password' placeholder='Enter your password' {...props} />
    )
  }
]

const LoginForm = () => {
  const form = useForm<TLoginSchema>(loginFormSchema)
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()

  async function onSubmit(values: TLoginSchema) {
    if (loading) return
    setLoading(true)

    try {
      const result = await authApiRequest.login(values)
      toast({
        description: result.payload.message
      })

      // localStorage.setItem(b'sessionToken', resJson.data.token)
      // ko set localStorage mà sẽ dùng next server trung gian để set ngược cookie từ api trả về
      // cảm giác logic hơi ngớ ngẩn, kiểu đi 2 trip
      // TODO liệu có better solution ko ? server action ?
      const token = result.payload.data.token
      // Đã cheat interceptor set cookie vào luôn
      await authApiRequest.auth({
        sessionToken: token,
        expiresAt: result.payload.data.expiresAt
      })
      setUser(result.payload.data.account)
      router.push('/me')
      router.refresh()
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
        noValidate
      >
        {FormMap.map(el => (
          <FormField
            key={el.key}
            control={form.control}
            name={el.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{el.label}</FormLabel>
                <FormControl>{el.component(field)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button className='w-full !mt-4' type='submit'>
          Login
          <StaticCheck />
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
