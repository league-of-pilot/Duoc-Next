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
import { TRegisterSchema, registerFormSchema } from './register.schema'

const FormMap: {
  key: keyof TRegisterSchema
  label: string
  component: (props: InputProps) => JSX.Element
}[] = [
  {
    key: 'name',
    label: 'Username',
    component: (props: InputProps) => (
      <Input placeholder='Enter your name' {...props} />
    )
  },
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
  },
  {
    key: 'confirmPassword',
    label: 'Confirm Password',
    component: (props: InputProps) => (
      <Input type='password' placeholder='Enter your password' {...props} />
    )
  }
]
export function RegisterForm() {
  const form = useForm<TRegisterSchema>(registerFormSchema)
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setUser } = useAppContext()

  const onSubmit = async (values: TRegisterSchema) => {
    if (loading) return
    setLoading(true)

    try {
      const result = await authApiRequest.register(values)
      toast({
        description: result.payload.message
      })
      // register ok thì flow BE trả token về, xem như login luôn
      await authApiRequest.auth({
        sessionToken: result.payload.data.token,
        expiresAt: result.payload.data.expiresAt
      })
      setUser(result.payload.data.account)
      router.push('/me')
    } catch (error) {
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
          Submit
          <StaticCheck />
        </Button>
      </form>
    </Form>
  )
}
