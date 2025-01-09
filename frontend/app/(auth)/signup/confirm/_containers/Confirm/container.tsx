import { redirect } from 'next/navigation'
import { SignUpConfirmForm } from './presentational'
import { headers } from 'next/headers'

type Props = {
  searchParams: { [key: string]: string }
}

export async function SignUpConfirmContainer({ searchParams }: Props) {
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  const params = await searchParams
  const email = params.email

  if (!email) {
    redirect('/signup')
  }

  return (
    <SignUpConfirmForm 
      csrfToken={csrfToken}
      email={email} 
    /> 
  )
}