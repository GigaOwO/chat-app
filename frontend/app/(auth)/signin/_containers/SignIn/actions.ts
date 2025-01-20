"use server"

import { signInUser } from '@/(auth)/_lib/featcher/auth'
import { SignInInput, SignInResponse } from '@/(auth)/_types'

export async function signIn(input: SignInInput): Promise<SignInResponse> {
  try {
    const response = await signInUser(input)
    if (response.signIn.success) {
      return {
        signIn: {
          success: true,
          message: response.signIn.message
        }
      }
    }
    return {
      signIn: {
        success: false,
        message: response.signIn.message
      }
    }
  } catch (err) {
    return {
      signIn: {
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred'
      }
    }
  }  
}