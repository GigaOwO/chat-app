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

export const RESEND_CONFIRMATION_CODE = gql`
  mutation ResendConfirmationCode($email: String!) {
    resendConfirmationCode(email: $email) {
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
    }
  }
`

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      success
      message
    }
  }
`