'use client';

import { useState } from 'react';
import { useProfileContext } from '../Profile/context';
import { CurrentProfilePresentation } from './presentational';
import { useUserContext } from '../User/context';

export function CurrentProfileContainer() {
  const { currentProfile, isLoading, getCurrentThemeColor } = useProfileContext();
  const { user } = useUserContext();
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
      user={user!}
      onFriendsOpen={() => setIsFriendsOpen(true)}
      onFriendsClose={() => setIsFriendsOpen(false)}
    />
  );
}