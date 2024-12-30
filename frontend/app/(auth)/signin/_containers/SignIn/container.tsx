import { SignInForm } from './presentational'
import { headers } from 'next/headers'

export async function SignInContainer() {
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  return <SignInForm csrfToken={csrfToken} />
}