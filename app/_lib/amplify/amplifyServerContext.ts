import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import { ResourcesConfig } from 'aws-amplify';
import { amplifyConfig } from './amplifyConfig';

export const { runWithAmplifyServerContext } = createServerRunner({
  config: amplifyConfig as ResourcesConfig
});