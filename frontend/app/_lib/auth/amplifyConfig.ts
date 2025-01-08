import { type ResourcesConfig } from 'aws-amplify'

const awsconfig = {
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID as string,
  },
};

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: awsconfig.Auth.userPoolId,
      userPoolClientId: awsconfig.Auth.userPoolClientId,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        }
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    }
  },
};