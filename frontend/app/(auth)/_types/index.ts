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

export type SignUpConfirmFormProps = {
  csrfToken?: string | null
  email: string
  username: string
}

export type RefreshTokenResponse = {
  refreshToken: {
    success: boolean
    message?: string
  }
}