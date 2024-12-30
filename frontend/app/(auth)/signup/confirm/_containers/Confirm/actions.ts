"use server"

import { redirect } from 'next/navigation'
import { SignUpConfirmInput } from '../../../../_types'
import { confirmSignUpUser, resendConfirmationCodeUser } from '@/(auth)/_lib/featcher/auth'

export async function confirmSignUp(input: SignUpConfirmInput): Promise<{ success: boolean, message?: string }> {
  try {
    const response = await confirmSignUpUser(input)
    if (response.success) {
      return {
        success: true,
        message: response.message
      }
    }
    return {
      success: false,
      message: response.message
    }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
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