'use client';

import { useProfileContext } from '../Profile/context';
import { ProfileSwitcherPresentation } from './presentational';
import { redirect } from 'next/navigation';

export function ProfileSwitcherContainer() {
  const { otherProfiles, isLoading, switchProfile, getThemeColorById } = useProfileContext();

  const handleProfileSwitch = async (profileId: string) => {
    await switchProfile(profileId);
    redirect('/dm');
  };

  return (
    <ProfileSwitcherPresentation
      profiles={otherProfiles}
      isLoading={isLoading}
      getThemeColorById={getThemeColorById}
      onProfileSwitch={handleProfileSwitch}
    />
  );
}