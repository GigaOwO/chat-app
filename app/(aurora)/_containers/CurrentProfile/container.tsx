'use client';

import { useState } from 'react';
import { useProfileContext } from '../Profile/context';
import { CurrentProfilePresentation } from './presentational';

export function CurrentProfileContainer() {
  const { currentProfile, isLoading, getCurrentThemeColor } = useProfileContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  return (
    <CurrentProfilePresentation
      profile={currentProfile}
      isLoading={isLoading}
      themeColor={getCurrentThemeColor()}
      isSettingsOpen={isSettingsOpen}
      isFriendsOpen={isFriendsOpen}
      onSettingsOpen={() => setIsSettingsOpen(true)}
      onSettingsClose={() => setIsSettingsOpen(false)}
      onFriendsOpen={() => setIsFriendsOpen(true)}
      onFriendsClose={() => setIsFriendsOpen(false)}
    />
  );
}