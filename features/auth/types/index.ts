export interface SignInFormProps {
  csrfToken: string | null;
}

export interface SignUpFormProps {
  csrfToken: string | null;
}

export interface AuthFormData {
  email: string;
  password: string;
}
