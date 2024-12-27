import { SignUpForm } from './presentational'
import { headers } from 'next/headers'

export async function SignUpContainer() {
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  return <SignUpForm csrfToken={csrfToken} />
}