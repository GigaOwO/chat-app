"use server"

import { graphqlClient } from '@/_lib/graphql/client'
import { CONFIRM_SIGN_UP, RESEND_CONFIRMATION_CODE } from '@/_lib/graphql/mutations/auth'
import { redirect } from 'next/navigation'
import { ResendConfirmationCodeResponse, SignUpConfirmInput, SignUpConfirmResponse } from '../../../../_types'

export async function confirmSignUp(input: SignUpConfirmInput) {
  try {
    const response = await graphqlClient.request<SignUpConfirmResponse>(CONFIRM_SIGN_UP, {
      input: {
        username: input.username,
        email: input.email,
        confirmationCode: input.confirmationCode,
      },
    })

    if (!response.confirmSignUp.success) {
      return response.confirmSignUp
    }

  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
  redirect('/signin')
}

export async function resendConfirmationCode(email: string) {
  try {
    const response = await graphqlClient.request<ResendConfirmationCodeResponse>(RESEND_CONFIRMATION_CODE, { email })
    return response.resendConfirmationCode
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
}