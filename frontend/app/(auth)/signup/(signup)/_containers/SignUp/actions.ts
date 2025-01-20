"use server"

import { signUpUser } from '@/(auth)/_lib/featcher/auth';
import { SignUpInput, SignUpResponse } from '@/(auth)/_types'

export async function signUp(input: SignUpInput): Promise<SignUpResponse> {
  try {
    const response = await signUpUser(input)
    if (response.signUp.success) {
      return {
        signUp: {
          success: true,
          message: response.signUp.message
        }
      }
    }  
    return {
      signUp: {
        success: false,
        message: response.signUp.message
      }
    }
  } catch (err) {
    return {
      signUp: { 
        success: false,
        message: err instanceof Error ? err.message : 'An error occurred'
      }
    }
  }
  
}