"use server"

import { redirect } from 'next/navigation'
import { SignUpConfirmInput } from '../../../../_types'
import { confirmSignUpUser, resendConfirmationCodeUser } from '@/(auth)/_lib/featcher/auth'

export async function confirmSignUp(input: SignUpConfirmInput): Promise<{ success: boolean, message?: string }> {
  let response;
  try {
    response = await confirmSignUpUser(input)
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }

  if (response.success) {
    redirect('/signin')
  }
  
  return response
}

export async function resendConfirmationCode(email: string) {
  try {
    return await resendConfirmationCodeUser(email)
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
}