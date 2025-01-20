import { type ResourcesConfig } from 'aws-amplify'

const awsconfig = {
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
    userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID as string,
  },
  GraphQL: {
    endpoint: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT as string,
    region: process.env.NEXT_PUBLIC_APPSYNC_REGION as string,
    apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY as string,
  }
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
        },
        preferred_username: {
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
  API: {
    GraphQL: {
      endpoint: awsconfig.GraphQL.endpoint,
      region: awsconfig.GraphQL.region,
      defaultAuthMode: 'apiKey',
      apiKey: awsconfig.GraphQL.apiKey,
    }
  }
};