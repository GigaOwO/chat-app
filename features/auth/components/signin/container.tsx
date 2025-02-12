import { SignInForm } from './presentational'
import { SignInFormProps } from '../../types'

export async function SignInContainer({ csrfToken }: SignInFormProps) {
  return <SignInForm csrfToken={csrfToken} />
}
