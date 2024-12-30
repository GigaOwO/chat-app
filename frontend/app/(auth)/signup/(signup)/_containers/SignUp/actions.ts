"use server"

import { signUpUser } from '@/(auth)/_lib/featcher/auth';
import { SignUpInput, SignUpResponse } from '@/(auth)/_types'
import { redirect } from 'next/navigation'

export async function signUp(input: SignUpInput): Promise<SignUpResponse> {
  let response;

  try {
    response = await signUpUser(input)
  } catch (err) {
    return {
      signUp: { 
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred'
      }
    }
  }
  
  if (response.signUp.success) {
    const userParams = new URLSearchParams({
      email: input.email,
      username: input.username,
    })
    redirect(`/signup/confirm?${userParams.toString()}`)
  }

  return response
}