import { SignUpConfirmForm } from './presentational'
import { headers } from 'next/headers'

export async function SignUpConfirmContainer() {
  const headersList = await headers()
  const csrfToken = headersList.get('X-CSRF-Token')

  return <SignUpConfirmForm csrfToken={csrfToken} />
}