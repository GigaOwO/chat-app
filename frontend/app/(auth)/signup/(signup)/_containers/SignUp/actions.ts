"use server"

import { SignUpResponse } from '@/(auth)/_types'
import { graphqlClient } from '@/_lib/graphql/client'
import { SIGN_UP, SignUpInput } from '@/_lib/graphql/mutations/auth'
import { redirect } from 'next/navigation'

export async function signUp(input: SignUpInput) {
  try {
    const response = await graphqlClient.request<SignUpResponse>(SIGN_UP, { input })
    
    if (response.signUp.success) {
      redirect('/signup/confirm')
    }
    
    return response.signUp
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
}