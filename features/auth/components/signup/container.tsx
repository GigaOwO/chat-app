import { SignUpForm } from './presentational'
import { SignUpFormProps } from '../../types'

export async function SignUpContainer({ csrfToken }: SignUpFormProps) {
  return <SignUpForm csrfToken={csrfToken} />
}
