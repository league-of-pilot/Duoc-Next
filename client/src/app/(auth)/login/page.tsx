// Bắt buộc dùng export default
// https://nextjs.org/docs/app/building-your-application/routing/defining-routes#creating-ui
// https://nextjs.org/docs/app/building-your-application/routing/colocation
// -> naming convention của Next

import LoginForm from '@/module/login/LoginForm'

export default function loginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
