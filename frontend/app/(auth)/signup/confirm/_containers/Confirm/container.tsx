import { redirect } from 'next/navigation'
import { SignUpConfirmForm } from './presentational'
import { headers } from 'next/headers'

type Props = {
  userParams: { [key: string]: string }
}

export async function SignUpConfirmContainer({ userParams }: Props) {
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  const email = userParams.email
  const username = userParams.username

  if (!email || !username) {
    redirect('/signup')
  }

  return (
    <SignUpConfirmForm 
      csrfToken={csrfToken}
      email={email}
      username={username}
    /> 
  )
}