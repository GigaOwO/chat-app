'use client';

import { configureAmplify } from './amplify-config';

export default function ConfigureAmplifyClientSide() {
  configureAmplify();
  return null;
}
