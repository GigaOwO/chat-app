'use client';

import { useState } from 'react';
import { useProfileContext } from '../Profile/context';
import { CurrentProfilePresentation } from './presentational';

export function CurrentProfileContainer() {
  const { currentProfile, isLoading, getCurrentThemeColor } = useProfileContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <CurrentProfilePresentation
      profile={currentProfile}
      isLoading={isLoading}
      themeColor={getCurrentThemeColor()}
      isSettingsOpen={isSettingsOpen}
      onSettingsOpen={() => setIsSettingsOpen(true)}
      onSettingsClose={() => setIsSettingsOpen(false)}
    />
  );
}