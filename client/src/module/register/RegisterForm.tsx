'use client'

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
import { API_URL } from '@/nextApp/api.const'
import { nativeFetch } from '@/nextApp/fetch.utils'
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

  const onSubmit = async (values: TRegisterSchema) => {
    //   const result = await fetch(
    //     `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
    //     {
    //       body: JSON.stringify(values),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       method: 'POST'
    //     }
    //   ).then((res) => res.json())
    // }

    const result = await nativeFetch.post(API_URL.AUTH.REGISTER, values)
    console.log('🚀 ~ result:', result)
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
        </Button>
      </form>
    </Form>
  )
}
