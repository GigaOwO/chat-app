import { ConfirmSignUpInput, ResendConfirmationCodeResponse, SignInInput, SignInResponse, SignUpConfirmResponse, SignUpInput, SignUpResponse } from '@/(auth)/_types'
import { graphqlClient } from '@/_lib/graphql/client'
import {
  SIGN_IN,
  SIGN_UP,
  CONFIRM_SIGN_UP,
  RESEND_CONFIRMATION_CODE,
} from '@/_lib/graphql/mutations/auth'
import { unstable_noStore } from 'next/cache'

export async function signInUser(input: SignInInput) {
  unstable_noStore()
  try {
    const response = await graphqlClient.request<SignInResponse>(SIGN_IN, { input })
    return response
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }
}

export async function signUpUser(input: SignUpInput) {
  unstable_noStore()
  try {
    const response = await graphqlClient.request<SignUpResponse>(SIGN_UP, { input })
    return response
  } catch (error) {
    console.error('Sign up error:', error)
    throw error
  }
}

export async function confirmSignUpUser(input: ConfirmSignUpInput) {
  unstable_noStore()
  try {
    const response = await graphqlClient.request<SignUpConfirmResponse>(CONFIRM_SIGN_UP, { input })
    return response.confirmSignUp
  } catch (error) {
    console.error('Confirm sign up error:', error)
    throw error
  }
}

export async function resendConfirmationCodeUser(email: string) {
  unstable_noStore()
  try {
    const response = await graphqlClient.request<ResendConfirmationCodeResponse>(RESEND_CONFIRMATION_CODE, { email })
    return response.resendConfirmationCode
  } catch (error) {
    console.error('Resend confirmation code error:', error)
    throw error
  }
}