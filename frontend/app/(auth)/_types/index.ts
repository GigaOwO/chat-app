export type SignInResponse = {
  signIn: {
    success: boolean
    message?: string
  }
}

export type SignUpResponse = {
  signUp: {
    success: boolean
    message?: string
  }
}

export type SignUpConfirmInput = {
  username: string
  email: string
  confirmationCode: string
}

export type SignUpConfirmResponse = {
  confirmSignUp: {
    success: boolean
    message?: string
  }
}

export type ResendConfirmationCodeResponse = {
  resendConfirmationCode: {
    success: boolean
    message?: string
  }
}