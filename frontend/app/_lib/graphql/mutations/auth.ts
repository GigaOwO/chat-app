import { gql } from 'graphql-request'

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      success
      message
    }
  }
`

export const CONFIRM_SIGN_UP = gql`
  mutation ConfirmSignUp($input: ConfirmSignUpInput!) {
    confirmSignUp(input: $input) {
      success
      message
    }
  }
`

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      success
      message
      tokens {
        accessToken
        idToken
        refreshToken
      }
    }
  }
`

export type SignUpInput = {
  username: string
  email: string
  password: string
}

export type ConfirmSignUpInput = {
  username: string
  email: string
  confirmationCode: string
}

export type SignInInput = {
  email: string
  password: string
}

export type AuthResponse = {
  success: boolean
  message: string
}

export type SignInResponse = {
  success: boolean
  message: string
  tokens?: {
    accessToken: string
    idToken: string
    refreshToken: string
  }
}