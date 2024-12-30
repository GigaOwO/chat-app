"use server"

import { signInUser } from '@/(auth)/_lib/featcher/auth'
import { SignInInput, SignInResponse } from '@/(auth)/_types'
import { redirect } from 'next/navigation'

export async function signIn(input: SignInInput): Promise<SignInResponse> {
  let response;
  try {
    response = await signInUser(input)
  } catch (err) {
    return {
      signIn: {
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred'
      }
    }
  }
  if (response.signIn.success) {
    redirect('/chat')
  }
  
  return response
}