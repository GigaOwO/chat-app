"use server"

import { SignInResponse } from '@/(auth)/_types'
import { graphqlClient } from '@/_lib/graphql/client'
import { SIGN_IN, SignInInput } from '@/_lib/graphql/mutations/auth'
import { redirect } from 'next/navigation'

export async function signIn(input: SignInInput) {
  try {
    const response = await graphqlClient.request<SignInResponse>(SIGN_IN, { input })

    if (!response.signIn.success) {
      return response.signIn
    }

  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'An error occurred'
    }
  }
  redirect('/chat')
}