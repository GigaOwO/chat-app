import { Amplify } from 'aws-amplify';
import { type ResourcesConfig } from '@aws-amplify/core';

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID!,
    }
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_APPSYNC_URL!,
      region: process.env.NEXT_PUBLIC_REGION!,
      defaultAuthMode: 'userPool',
    }
  },
  Storage: {
    S3: {
      bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
      region: process.env.NEXT_PUBLIC_REGION!,
    }
  }
};

export function configureAmplify() {
  Amplify.configure(amplifyConfig, {
    ssr: true
  });
}
