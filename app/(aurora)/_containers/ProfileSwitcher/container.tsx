'use client';

import { useState } from 'react';
import { useProfileContext } from '../Profile/context';
import { ProfileSwitcherPresentation } from './presentational';

export function ProfileSwitcherContainer() {
  const { otherProfiles, isLoading, switchProfile, getThemeColorById } = useProfileContext();
  const [switchingProfileId, setSwitchingProfileId] = useState<string | null>(null);

  const handleProfileSwitch = async (profileId: string) => {
    setSwitchingProfileId(profileId);
    await switchProfile(profileId);
    setSwitchingProfileId(null);
  };

  return (
    <ProfileSwitcherPresentation
      profiles={otherProfiles}
      isLoading={isLoading}
      switchingProfileId={switchingProfileId}
      getThemeColorById={getThemeColorById}
      onProfileSwitch={handleProfileSwitch}
    />
  );
}